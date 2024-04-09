<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestCredit extends Model
{
    use HasFactory;
    protected $table = 'request_credits';

    protected $fillable = [
        'username',
        'amount',
        'service_id',
        'user_id',
        'price',
        'reject_reason',
        'payment_status',
        'status',
    ];

    public function user() {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }
    public function service() {
        return $this->hasOne('App\Models\Service', 'id', 'service_id');
    }
}
