<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\OtherService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActionController extends Controller
{
    //
    public function addOtherService(Request $request)
    {

        $request->validate([
            'credits' => 'numeric|gt:9',
        ]);
        $service = new OtherService();
        $service->name = $request->name;
        $service->action= $request->action;
        $service->credits = $request->creditDesired;
        $service->username = $request->username;
        $service->password = $request->password;
        $service->user_id = Auth::user()->id;

        if ($service->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been sent successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function RequestOtherService(): Response
    {
        $services = OtherService::with('user')->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('admin/services/OtherService', [
            'status'     => 200,
            'services'   => $services,
        ]);
    }
    public function otherService(): Response
    {
        $services = OtherService::where('user_id',Auth::user()->id)->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('client/services/OtherService', [
            'status'     => 200,
            'services'   => $services,
        ]);
    }
    public function responseOtherService(Request $request)
    {
        $service = OtherService::find($request->id);
        $service->price = $request->price;
        $service->reject_reason = $request->rejectReason;
        $service->status = $request->status;

        if ($service->save()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been sent successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function destory($id)
    {
        $request = OtherService::find($id);

        if ($request->delete()) {
            return redirect()->back()->with(['sweet_success' => __('Request has been deleted successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }

}
