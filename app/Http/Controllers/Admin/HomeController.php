<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewPanel;
use App\Models\OtherService;
use App\Models\Payment;
use App\Models\RequestCredit;
use Illuminate\Support\Facades\Auth;
use App\Models\Service;
use App\Models\ServiceUser;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\Node\Inline\Newline;

class HomeController extends Controller
{
    //
    public function indexAdmin(): Response
    {
        $service = Service::paginate(5);
        $panels = NewPanel::with('user','service')->orderBy('id', 'desc')->paginate(5);
        $credits = RequestCredit::with('user','service')->orderBy('id', 'desc')->paginate(5);
        $payments = Payment::with('user')->orderBy('id', 'desc')->paginate(5);

        $totalClients = User::count();
        $totalPanels = NewPanel::count();
        $totalCredits = RequestCredit::count();
        $totalPayments = Payment::count();

        return Inertia::render('admin/Dashboard', [
            'status'        =>  200,
            'credits'       =>  $credits,
            'panels'        =>  $panels,
            'payments'      =>  $payments,
            'totalPanels'   =>  $totalPanels,
            'totalCredits'  =>  $totalCredits,
            'totalClients'  =>  $totalClients,
            'totalPayments' =>  $totalPayments,
        ]);
    }
    public function backupTotalData()
    {
        $tickets = Ticket::where('status', 'in progress')->count();
        $panels = NewPanel::where('status', 'in progress')->count();
        $credits = RequestCredit::where('status', 'in progress')->count();
        $payments = Payment::where('status', 'in progress')->count();
        $otherservice = OtherService::where('status', 'in progress')->count();

        return response()->json(['tickets' => $tickets,
            'credits'       =>  $credits,
            'panels'        =>  $panels,
            'payments'      =>  $payments,
            'otherservice'  =>  $otherservice,
        ]);
    

        // return Inertia::render('admin/Dashboard', [
        //     'status'        =>  200,
        //     'credits'       =>  $credits,
        //     'panels'        =>  $panels,
        //     'payments'      =>  $payments,
        //     'tickets'       =>  $tickets,
        //     'totalCredits'  =>  $totalCredits,
        //     'totalClients'  =>  $totalClients,
        //     'totalPayments' =>  $totalPayments,
        // ]);
    }
    public function indexClient(): Response
    {
        
        $user_id = Auth::user()->id;
        if (ServiceUser::where('user_id', $user_id)->exists()) {
            $service = Service::leftJoin('service_user', function ($join) use ($user_id) {
                    $join->on('services.id', '=', 'service_user.service_id')
                         ->where('service_user.user_id', '=', $user_id);
                })
                ->selectRaw('services.*, COALESCE(service_user.price, services.price) AS final_price')
                ->paginate(10);
        } else {
            $service = Service::selectRaw('services.*, services.price as final_price')->paginate(10);
        }
        
        $totalPanels = NewPanel::where('user_id', $user_id)->count();
        $totalCredits = RequestCredit::where('user_id', $user_id)->count();
        $totalPayments = Payment::where('user_id', $user_id)->count();

        return Inertia::render('client/Dashboard', [
            'status'        =>  200,
            'service'       =>  $service,
            'totalPanels'   =>  $totalPanels,
            'totalCredits'  =>  $totalCredits,
            'totalPayments'  =>  $totalPayments,
        ]);
    }
    public function client(): Response
    {
        $clients = User::where('role','<>',1)->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('admin/client/ClientList', [
            'status'   => 200,
            'clients'  =>  $clients,
        ]);
    }
    public function updateBalance(Request $request)
    {
        $clients = User::find($request->id);
        $total = $request->new_balance + $clients->balance;
        
        $clients->balance = $total;

        if ($clients->save()) {
            return redirect()->back()->with(['sweet_success' => __('Balance has been updated successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed to update Balance, please try again')]);
        }
    }
    public function getClient(Request $request)
    {
        // dd($request->all());
        $searchBy = $request->searchBy;
        $search = $request->search;
        $clients =  User::where('role','<>',1);

        if ($searchBy && isset($searchBy['value'])) {
            $clients->where(function ($query) use ($searchBy) {
                if ($searchBy['value'] == 1) {
                    $query->where('currency', 'MAD')
                        ->orWhere('currency', 'EUR')
                        ->orWhere('currency', 'USD');
                } 
                if ($searchBy['value'] == 2) {
                    $query->where('currency', 'MAD');
                } elseif ($searchBy['value'] == 3) {
                    $query->where('currency', 'EUR');
                } elseif ($searchBy['value'] == 4) {
                    $query->where('currency', 'USD'); 
                }
            });
        } else if ($search) {
            $clients->where(function ($query) use ($search) {
                $query->where('username', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        $clients = $clients->paginate(5);

        return Inertia::render('admin/client/ClientList', [
            'clients' => $clients,
        ]);

    }
}
