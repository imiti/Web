<?php

namespace App\Http\Model;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    //
    protected $table='notice';
    protected $primaryKey='id';
    public $timestamps=false;
    protected $guarded=[];
}
