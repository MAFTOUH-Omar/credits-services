<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    //
    public function index(): Response
    {
        $tickets = Ticket::with('ticketResponse')
                        ->where('user_id',Auth::user()->id)
                        ->orderBy('id', 'desc')
                        ->paginate(10);
        return Inertia::render('client/tickets/TicketList', [
            'status'         => 200,
            'tickets'        => $tickets,
        ]);
    }
    public function store (Request $request)
    {
        $user_id = Auth::user()->id;
        $ticket = New Ticket();
        $ticket->service_name = $request->service_name;
        $ticket->quantity = $request->quantity;
        $ticket->message = $request->message;
        $ticket->user_id = $user_id;

        if ($ticket->save()) {
            return redirect()->back()->with(['sweet_success' => __('ticket has been sent successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }

    }
    public function getTicket(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $tickets = Ticket::with('ticketResponse')->where('user_id',$user_id);

        if ($searchBy && isset($searchBy['value'])) {
            $tickets->where(function ($query) use ($searchBy) {
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
            $tickets->where(function ($query) use ($request) {
                $query->where('service_name', 'like', '%' . $request->search . '%')
                    ->orWhere('quantity', 'like', '%' . $request->search . '%');
            });
        }


        $tickets = $tickets->paginate(10);

        return Inertia::render('client/tickets/TicketList', [
            'tickets' => $tickets,
        ]);
    }
}
