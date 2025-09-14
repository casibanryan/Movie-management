<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movie extends Model
{
    use SoftDeletes;
    const CREATED_AT = 'date_added';
    protected $fillable = [
        'title',
        'description',
        'video_file',
    ];
}
