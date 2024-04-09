<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherService extends Model
{
    use HasFactory;
    protected $table = 'other_service';

    protected $fillable = [
        'name',
        'action',
        'status',
        'credits',
        'username',
        'password',
        'reject_reason',
        'user_id',
        'price',
    ];
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

}
