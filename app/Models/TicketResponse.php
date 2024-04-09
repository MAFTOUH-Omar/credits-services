<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketResponse extends Model
{
    use HasFactory;
    protected $table = 'tickets_response';

    protected $fillable = [
        'admin_id',
        'ticket_id',
        'message_response',      
    ];
    public function ticket()
    {
        return $this->hasOne('App\Models\Ticket','ticket_id','id');
    }
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'admin_id', 'id');
    }

}
