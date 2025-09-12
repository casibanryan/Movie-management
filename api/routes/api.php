<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\MovieController;

Route::prefix('v1')
  ->middleware('api')
  ->group(function () {
    Route::apiResource('movies', MovieController::class);
  });
