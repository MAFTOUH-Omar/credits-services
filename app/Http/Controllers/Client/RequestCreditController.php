<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RequestCredit;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class RequestCreditController extends Controller
{
    //
    public function index(): Response
    {
        $user_id = Auth::user()->id;
        $credits = RequestCredit::with('service')
                                ->orderBy('id', 'desc')
                                ->where('user_id', $user_id)
                                ->paginate(10);


        return Inertia::render('client/credits/RequestCredits', [
            'status'        =>  200,
            'credits'        =>  $credits,
        ]);
    }
   
    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'numeric|gt:9',
        ]);
        $serviceuser = ServiceUser::where('user_id', Auth::user()->id)
                                    ->where('service_id', $request->service_id)
                                    ->first();
        if ($serviceuser) {
            $price = $serviceuser->price * $request->amount;
        } else {
            $service = Service::find($request->service_id);
    
            // Check if the service exists
            if (!$service) {
                return redirect()->back()->with(['sweet_error' => __('Service not found')]);
            }
    
            $price = $service->price * $request->amount;
        }
        $credits = new RequestCredit();
        $credits->username = $request->username;
        $credits->amount = $request->amount;
        $credits->user_id = Auth::user()->id;
        $credits->service_id = $request->service_id;
        $credits->price = $price;

        if ($credits->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been added successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function update(Request $request)
    {
        $serviceuser = ServiceUser::where('user_id', Auth::user()->id)
                                    ->where('service_id', $request->service_id)
                                    ->first();
        if ($serviceuser) {
            $price = $serviceuser->price * $request->amount;
        } else {
            $service = Service::where('id', $request->service_id)->first();
            $price = $service->price * $request->amount;
        }
        $credits = RequestCredit::find($request->id);
        $credits->username = $request->username;
        $credits->amount = $request->amount;
        $credits->price = $price;
        if ($credits->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been Updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function getCredit(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $credits = RequestCredit::with('service')
            ->where('user_id', $user_id);

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
                });
            });
        }


        $credits = $credits->paginate(10);

        return Inertia::render('client/credits/RequestCredits', [
            'credits' => $credits,
        ]);
    }
    public function destory($id)
    {
        $credits = RequestCredit::find($id);
        if ($credits) {
            $credits->delete();
            return redirect()->back()->with(['sweet_success' => __('the Request has been Deleet successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, Please try again. If the problem persists, please contact the support team')]);
        }
    }
}
