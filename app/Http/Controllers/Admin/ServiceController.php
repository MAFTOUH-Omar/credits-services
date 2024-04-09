<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    //
    public function indexAdmin(): Response
    {
        $service = Service::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('admin/services/ServicetList', [
            'status'         => 200,
            'service'        => $service,
        ]);
    }
    public function indexClient(): Response
    {
        $id = Auth::id();

        $services = ServiceUser::with('service')
                                ->where('user_id', $id)
                                ->orderBy('id', 'desc')
                                ->paginate(10);
        
        return Inertia::render('client/services/ServicetList', [
            'status'          => 200,
            'services'        => $services,
        ]);
    }
    public function indexAdd(): Response
    {
        return Inertia::render('admin/services/CreateNewService', [
            'status'         => 200,
        ]);
    }
    public function addService(Request $request)
    {

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = $file->getClientOriginalName();
            $file->storeAs('public/media/', $filename);

            $imagePath = '/storage/media/' . $filename;
        }

        // $imagePath = $request->file('logo')->store('public/images');

        $service = new Service();
        $service->name = $request->name;
        $service->price = $request->price;
        $service->old_price = $request->old_price;
        $service->description = $request->description;
        $service->logo = $imagePath;

        if ($service->save()) {
            return redirect()->back()->with(['sweet_success' => __('Service has been added successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }
    }
    public function update(Request $request)
    {

        $service = Service::findOrFail($request->id);
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $filename = $file->getClientOriginalName();
            $file->storeAs('public/media/', $filename);

            $service->logo = '/storage/media/' . $filename;
        }

        $service->name = $request->name;
        $service->price = $request->price;
        $service->old_price = $request->old_price;
        $service->description = $request->description;

        if ($service->save()) {
            return redirect()->back()->with(['sweet_success' => __('Service has been updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to update service, please try again')]);
        }
    }
    public function destory($id)
    {
    }
    public function setServicePrice($id)
    {
        $prices = ServiceUser::with('users', 'service')->where('user_id', $id)->get();
        $client = User::find($id);
        if (ServiceUser::where('user_id', $id)->exists()) {
            $services = Service::leftJoin('service_user', function ($join) use ($id) {
                $join->on('services.id', '=', 'service_user.service_id')
                    ->where('service_user.user_id', '=', $id);
            })
                ->select('services.*', 'service_user.price')
                ->get();
        } else {
            $services = Service::get();
        }


        // dd($prices);
        return inertia('admin/client/SetServicePrices', [
            'client'  =>  $client,
            'services' => $services,
            'prices'  => $prices,
        ]);
    }
    public function updatePrice(Request $request)
    {

        $user_id = $request->client_id;
        $prices = $request->prices;

        foreach ($prices as $service_id => $price) {
            $serviceUser =  ServiceUser::where('user_id', $user_id)->where('service_id', $service_id)->first();
            if ($serviceUser) {
                $serviceUser->price = $price;
                $serviceUser->save();
            } else {
                $serviceUser = new ServiceUser();
                $serviceUser->service_id = $service_id;
                $serviceUser->user_id = $user_id;
                $serviceUser->price = $price;
                $serviceUser->save();
            }
        }



        if ($serviceUser->save()) {
            return redirect()->back()->with(['sweet_success' => __('Prices has been updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to update service, please try again')]);
        }
    }
    public function getServiceClient(Request $request)
    {
        $id = Auth::id();
        $search = $request->search;
        if (ServiceUser::where('user_id', $id)->exists()) {
            $services = Service::leftJoin('service_user', function ($join) use ($id) {
                $join->on('services.id', '=', 'service_user.service_id')
                    ->where('service_user.user_id', '=', $id);
            })
                ->select('services.*', 'service_user.price');
        } else {
            $services = Service::query();
        }
        if ($search) {
            $services->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            });
        }

        $services = $services->paginate(10);

        return Inertia::render('client/services/ServicetList', [
            'status'          => 200,
            'services'        => $services,
        ]);
        
    }
    public function getServiceAdmin(Request $request)
    {
        $search = $request->search;
        if ($search) {
            $service = Service::where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('price', 'like', '%' . $search . '%');
            })->paginate(10);
        }

        return Inertia::render('admin/services/ServicetList', [
            'status'          => 200,
            'service'        => $service,
        ]);
        
    }
}
