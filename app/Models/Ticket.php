<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $table = 'tickets';

    protected $fillable = [
        'service_name',
        'quantity',
        'user_id',
        'message',
        'status',
        
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
    public function ticketResponse()
    {
        return $this->belongsTo('App\Models\TicketResponse','id','ticket_id');
    }

}
