<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payment';

    protected $fillable = [
        'amount',
        'user_id',
        'currency',
        'equivalence',
        'type',
        'preuve',
        'reject_reason',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
