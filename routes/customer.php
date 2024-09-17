<?php

use App\Http\Controllers\User\AuthController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('user.auth.register')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/login', 'login')->name('user.auth.login')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::post('/logout', 'logout')->name('user.auth.logout')
        ->withoutMiddleware(VerifyCsrfToken::class);
});

Route::get('/login', function() {
    return response()->json('login page');
})->name('login');

Route::get('/', function () {
    return response()->json([
        'message' => 'hello',
    ]);
})->middleware(['auth:user']);
