<?php

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LabController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('user.auth.login');
    Route::get('/login', 'index')->name('user.auth.index');
    Route::post('/register', 'register')
        ->name('user.auth.register')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/logout', 'logout')->name('user.auth.logout');
});

Route::controller(LabController::class)->group(function() {
    Route::post('/labs/{lab}/submit', 'submit')
        ->name('user.labs.submit')
        ->middleware('auth:user')
        ->withoutMiddleware(VerifyCsrfToken::class);
});
