<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    //
    public function index(): Response
    {
        $tickets = Ticket::with('ticketResponse','user')
                        ->where('status', 'in progress')
                        ->orderBy('id', 'desc')->paginate(10);
        return Inertia::render('admin/tickets/TicketList', [
            'status'         => 200,
            'tickets'        => $tickets,
        ]);
    }
    public function response (Request $request)
    {
        $user_id = Auth::user()->id;

        $ticket_response = New TicketResponse();
        $ticket_response->message_response = $request->message_response;
        $ticket_response->admin_id = $user_id;
        $ticket_response->ticket_id = $request->ticket_id;

        $ticket = Ticket::find($request->ticket_id);
        $ticket->status = $request->status;
        $ticket->save(); 


        if ($ticket_response->save()) {
            return redirect()->back()->with(['sweet_success' => __('ticket has been Responded successfully')]);
        } else {
            return redirect()->back()->with(['sweet_error' => __('Failed, please try again')]);
        }

    }
    public function getTicket(Request $request)
    {
        $searchBy = $request->searchBy;
        $user_id = Auth::user()->id;
        $tickets = Ticket::with('ticketResponse','user');

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
                $query->whereHas('user', function ($query) use ($request) {
                    $query->where('username', 'like', '%' . $request->search . '%');
                })->orWhere('service_name', 'like', '%' . $request->search . '%')
                ->orWhere('quantity', 'like', '%' . $request->search . '%');
            });
        }

        $tickets = $tickets->paginate(10);

        return Inertia::render('admin/tickets/TicketList', [
            'tickets' => $tickets,
        ]);
    }
}
