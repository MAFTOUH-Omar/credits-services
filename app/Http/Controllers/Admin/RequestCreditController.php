<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RequestCredit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use Inertia\Inertia;
use Inertia\Response;

class RequestCreditController extends Controller
{
    //
    public function index(): Response
    {
        $credits = RequestCredit::with('user', 'service')
                                ->orderBy('id', 'desc')
                                ->where('status', 'in progress')
                                ->paginate(5);


        return Inertia::render('admin/credits/RequestCredits', [
            'status'        =>  200,
            'credits'        =>  $credits,
        ]);
    }
    public function update(Request $request)
    {
        dd($request->all());
    }
    public function response(Request $request)
    {
        $credits = RequestCredit::find($request->id);
        $credits->reject_reason = $request->rejectReason;
        $credits->status = $request->status;

        if ($credits->save()) {
            return redirect()->back()->with(['sweet_success' => __('The request was processed successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to process request, please try again')]);
        }
    }
    public function paidCredit($id)
    {
        $credits = RequestCredit::find($id);
        $credits->update(['payment_status' => 'paid']);

        return redirect()->back()->with(['sweet_success' => __('Payment status updated successfully')]);
    }
    public function changePrice(Request $request)
    {
        dd($request->id);
        $credits = RequestCredit::find($request->id);
        $credits->update(['price' => $request->price]);

        return redirect()->back()->with(['sweet_success' => __('Price updated successfully')]);
    }
    public function getCredit(Request $request)
    {
        // dd($request->all());
        $searchBy = $request->searchBy;

        $credits =  RequestCredit::with('user', 'service');

        if ($searchBy && isset($searchBy['value'])) {
            $credits->where(function ($query) use ($searchBy) {
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
            $credits->where(function ($query) use ($request) {
                $query->whereHas('user', function ($query) use ($request) {
                    $query->where('username', 'like', '%' . $request->search . '%');
                })->orWhereHas('service', function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->search . '%');
                })->orWhere('payment_status', '=', $request->search);
            });
        }

        $credits = $credits->paginate(10);

        return Inertia::render('admin/credits/RequestCredits', [
            'credits' => $credits,
        ]);
    }
}
