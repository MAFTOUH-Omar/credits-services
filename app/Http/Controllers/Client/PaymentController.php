<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;


class PaymentController extends Controller
{
    //
    public function index(): Response
    {
        $user_id = Auth::user()->id;
        $payments = Payment::with('user')
                            ->where('user_id', $user_id)
                            ->orderBy('id', 'desc')
                            ->paginate(10);

        return Inertia::render('client/payment/PaymentList', [
            'status'        =>  200,
            'payments'        =>  $payments,
        ]);
    }
    public function indexAdd(): Response
    {
        return Inertia::render('client/payment/NewPayment', [
            'status'        =>  200,
        ]);
    }
    public function fetchExchangeRate(Request $request)
    {
        $fromCurrency = $request->input('fromCurrency');
        $toCurrency = $request->input('toCurrency');
        $amount = $request->input('amount');
        dd($request->all());

        try {
            $response = Http::get("https://v6.exchangerate-api.com/v6/a775adc2d698e308179969ad/latest/{$fromCurrency}");
            $data = $response->json();

            if ($data && isset($data['conversion_rates'][$toCurrency])) {
                $exchangeRate = $data['conversion_rates'][$toCurrency];
                $convertedAmount = $amount * $exchangeRate;
                return response()->json(['equivalence' => "{$convertedAmount} {$toCurrency}"]);
            } else {
                return response()->json(['error' => 'Rates data not found in response'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching exchange rate'], 500);
        }
    }
    public function store(Request $request)
    {

    //    dd($request->all());
        $data = $request->data;
        if (isset($data['preuve'])) {
            $file = $data['preuve'];
            if ($file->isValid()) {
                $filename = $file->getClientOriginalName();
                $file->storeAs('public/media/', $filename);       
                $imagePath = '/storage/media/' . $filename;
 
            }
        }
        $payments = new Payment();
        $payments->amount = $data['amount'];
        $payments->type = $data['type'];
        $payments->currency = $data['currency'];
        $payments->user_id = Auth::user()->id;
        $payments->preuve = $imagePath;
        $payments->equivalence = $request->equivalence;

        if ($payments->save()) {
            return redirect()->back()->with(['sweet_success' => __('Payment has been added successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function update(Request $request)
    {
        if (isset($request->preuve)) {
            $file = $request->preuve;
            if ($file->isValid()) {
                $filename = $file->getClientOriginalName();
                $file->storeAs('public/media/', $filename);       
                $imagePath = '/storage/media/' . $filename;
 
            }
        }
        $payments = Payment::find($request->id);
        $payments->amount = $request->amount;
        $payments->type = $request->type;
        $payments->currency = $request->currency;
        $payments->user_id = Auth::user()->id;
        $payments->preuve = $imagePath;
        $payments->equivalence = $request->equivalence;
        if ($payments->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been Updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function getPayment(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $payments = Payment::where('user_id', $user_id);

        if ($searchBy && isset($searchBy['value'])) {
            $payments->where(function ($query) use ($searchBy) {
                if ($searchBy['value'] == 1) {
                    $query->where('status', 'in progress')
                        ->orWhere('status', 'Approved')
                        ->orWhere('status', 'Rejected');
                } elseif ($searchBy['value'] == 2) {
                    $query->where('status', 'in progress');
                } elseif ($searchBy['value'] == 3) {
                    $query->where('status', 'Approved');
                } elseif ($searchBy['value'] == 4) {
                    $query->where('status', 'Rejected');
                }
            });
        }

        if ($request->search) {
            $payments->where(function ($query) use ($request) {
                $query->whereHas('user', function ($query) use ($request) {
                    $query->where('username', 'like', '%' . $request->search . '%');
                })->orWhere('amount', 'like', '%' . $request->search . '%')
                ->orWhere('type', 'like', '%' . $request->search . '%');
            });
        }

        $payments = $payments->paginate(10);

        return Inertia::render('client/payment/PaymentList', [
            'payments' => $payments,
        ]);
    }
    public function destory($id)
    {
        $payments = Payment::find($id);
        if ($payments) {
            $payments->delete();
            return redirect()->back()->with(['sweet_success' => __('the Request New Panel has been Deleet successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, Please try again. If the problem persists, please contact the support team')]);
        }
    }
}
