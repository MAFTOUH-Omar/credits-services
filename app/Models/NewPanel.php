<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPanel extends Model
{
    use HasFactory;
    protected $table = 'new_panel';

    protected $fillable = [
        'username',
        'password',
        'price',
        'service_id',
        'reject_reason',
        'payment_status',
        'user_id',
        'status',
        
    ];

    public function user() {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }
    public function service() {
        return $this->hasOne('App\Models\Service', 'id', 'service_id');
    }
}
