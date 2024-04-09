<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        'name',
        'description',
        'price',
        'old_price',
        'logo',
    ];

    public function requestCredits() {
        return $this->hasMany('App\Models\RequestCredit', 'service_id', 'id');
    }
    public function newPanel()
    {
        return $this->hasMany('App\Models\NewPanel', 'service_id', 'id');
    }
    public function serviceUser()
    {
        return $this->belongsTo('App\Models\ServiceUser', 'id', 'service_id');
    }
}
