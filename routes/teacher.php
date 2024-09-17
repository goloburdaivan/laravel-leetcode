<?php

use App\Http\Controllers\Teacher\AuthController;
use App\Http\Controllers\Teacher\LabController;
use App\Http\Controllers\Teacher\TestCaseController;
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

Route::controller(LabController::class)->group(function() {
    Route::post('/labs', 'create')
        ->name('labs.create')
        ->middleware('auth:teacher')
        ->withoutMiddleware(VerifyCsrfToken::class);
});

Route::controller(TestCaseController::class)->group(function() {
    Route::post('/labs/{lab}/test-cases', 'create')
        ->name('labs.test-cases.create')
        ->middleware('auth:teacher')
        ->withoutMiddleware(VerifyCsrfToken::class);
    Route::get('/labs/{lab}/test-cases', 'index')
        ->name('labs.test-cases.index')
        ->middleware('auth:teacher')
        ->withoutMiddleware(VerifyCsrfToken::class);
});
