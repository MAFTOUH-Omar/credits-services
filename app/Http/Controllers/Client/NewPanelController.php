<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\NewPanel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class NewPanelController extends Controller
{
    //
    public function index(): Response
    {
        $user_id = Auth::user()->id;
        $panels = NewPanel::with('service')
                            ->where('user_id', $user_id)
                            ->orderBy('id', 'desc')
                            ->paginate(5);


        return Inertia::render('client/panel/CreatePanel', [
            'status'        =>  200,
            'panels'        =>  $panels,
        ]);
    }
    public function store(Request $request)
    {

        $serviceuser = ServiceUser::where('user_id', Auth::user()->id)
                                    ->where('service_id', $request->service_id)
                                    ->first();
        if ($serviceuser) {
            $price = $serviceuser->price;
        } else {
            $service = Service::where('id', $request->service_id)->first();
            $price = $service->price * $request->amount;
        }

        
        $panels = new NewPanel();
        $panels->username = $request->username;
        $panels->password = $request->password;
        $panels->user_id = Auth::user()->id;
        $panels->service_id = $request->service_id;
        $panels->price = $price;

        if ($panels->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been added successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function update(Request $request)
    {
        $panels = NewPanel::find($request->id);
        $panels->username = $request->username;
        $panels->password = $request->password;
        if ($panels->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been Updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function getPanel(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $panels = NewPanel::with('service')
                            ->where('user_id', $user_id);

        if ($searchBy && isset($searchBy['value'])) {
            $panels->where(function ($query) use ($searchBy) {
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
            $panels->where(function ($query) use ($request) {
                $query->whereHas('user', function ($query) use ($request) {
                    $query->where('username', 'like', '%' . $request->search . '%');
                })->orWhereHas('service', function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->search . '%');
                });
            });
        }
        

        $panels = $panels->paginate(10);

        return Inertia::render('client/panel/CreatePanel', [
            'panels' => $panels,
        ]);

    }
    public function destory($id)
    {
        $panels = NewPanel::find($id);
        if ($panels) {
            $panels->delete();
            return redirect()->back()->with(['sweet_success' => __('the Request New Panel has been Deleet successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, Please try again. If the problem persists, please contact the support team')]);
        }
    }
}
