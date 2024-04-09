<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    //
    public function index(): Response
    {
        $payments = Payment::with('user')
                            ->where('status', 'in progress')
                            ->orderBy('id', 'desc')
                            ->paginate(5);


        return Inertia::render('admin/payment/PaymentList', [
            'status'       =>  200,
            'payments'     =>  $payments,
        ]);
    }
    public function response(Request $request)
    {
        $payments = Payment::find($request->id);
        $payments->reject_reason = $request->rejectReason;
        $payments->status = $request->status;
        if($request->status ==  "Approved" ){
            $client = User::find($request->client_id);
            $client->balance = $client->balance + $request->price;
            $client->save();
        }
        

        if ($payments->save()) {
            return redirect()->back()->with(['sweet_success' => __('The request was processed successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to process request, please try again')]);
        }
    }
    public function getPayment(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $payments = Payment::with('user');

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

        return Inertia::render('admin/payment/PaymentList', [
            'payments' => $payments,
        ]);
    }
}
