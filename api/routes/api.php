<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\MovieController;

Route::prefix('v1')
  ->middleware('api')
  ->group(function () {
    Route::apiResource('movies', MovieController::class);
    Route::group(['prefix' => 'auth'], function () {
      Route::post('login', [AuthController::class, 'login']);
      Route::post('logout', [AuthController::class, 'logout']);
      Route::post('refresh', [AuthController::class, 'refresh']);
      Route::get('me', [AuthController::class, 'me']);
    });
  });
