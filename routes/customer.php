<?php

use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\LabController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('user.auth.register')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::get('/login', function() {
        return response()->json([
            'message' => 'Pls log in',
        ]);
    })->name('login');
    Route::post('/login', 'login')->name('user.auth.login')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/logout', 'logout')->name('user.auth.logout')
        ->withoutMiddleware(VerifyCsrfToken::class);
});

Route::controller(LabController::class)->group(function() {
    Route::post('/labs/{lab}/submit', 'submit')
        ->name('user.labs.submit')
        ->middleware('auth:user')
        ->withoutMiddleware(VerifyCsrfToken::class);
});
