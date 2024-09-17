<?php

use App\Http\Controllers\Teacher\AuthController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('teacher.auth.register')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/login', 'login')->name('teacher.auth.login')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/logout', 'logout')->name('teacher.auth.logout')
        ->withoutMiddleware(VerifyCsrfToken::class);
});
