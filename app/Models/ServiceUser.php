<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceUser extends Model
{
    use HasFactory;
    protected $table = 'service_user';

    protected $fillable = [
        'service_id',
        'user_id',
        'price',
    ];

    public function service()
    {
        return $this->belongsTo('App\Models\Service', 'service_id', 'id');
    }
    public function users()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

}
