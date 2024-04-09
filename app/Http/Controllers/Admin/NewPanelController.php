<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewPanel;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewPanelController extends Controller
{
    //
    public function index(): Response
    {
        $user_id = Auth::user()->id;
        $panels = NewPanel::with('user', 'service')
                        ->where('status', 'in progress')
                        ->orderBy('id', 'desc')
                        ->paginate(5);


        return Inertia::render('admin/panel/CreatePanel', [
            'status'        =>  200,
            'panels'        =>  $panels,
        ]);
    }
    public function update(Request $request)
    {
        dd($request->all());
    }
    public function response(Request $request)
    {
        $panel = NewPanel::find($request->id);
        $panel->reject_reason = $request->rejectReason;
        $panel->status = $request->status;

        if ($panel->save()) {
            return redirect()->back()->with(['sweet_success' => __('The request was processed successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to process request, please try again')]);
        }
    }
    public function paidPanel($id)
    {
        $panel = NewPanel::find($id);
        $panel->update(['payment_status' => 'paid']);

        return redirect()->back()->with(['sweet_success' => __('Payment status updated successfully')]);
    }
    public function changePrice(Request $request)
    {
        dd($request->id);
        $credits = NewPanel::find($request->id);
        $credits->update(['price' => $request->price]);

        return redirect()->back()->with(['sweet_success' => __('Price updated successfully')]);
    }
    public function getPanel(Request $request)
    {
        $searchBy = $request->searchBy;

        $panels = NewPanel::with('user', 'service');

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
                })->orWhere('payment_status', '=', $request->search);
            });
        }
        

        $panels = $panels->paginate(10);

        return Inertia::render('admin/panel/CreatePanel', [
            'panels' => $panels,
        ]);

    }
}

