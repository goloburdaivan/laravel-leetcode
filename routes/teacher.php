<?php

use App\Http\Controllers\Teacher\AuthController;
use App\Http\Controllers\Teacher\HomeController;
use App\Http\Controllers\Teacher\LabController;
use App\Http\Controllers\Teacher\TestCaseController;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('teacher.auth.login');
    Route::get('/login', 'index')->name('teacher.auth.index');
    Route::post('/register', 'register')->name('teacher.auth.register');
    Route::post('/logout', 'logout')->name('teacher.auth.logout');
});

Route::controller(LabController::class)->group(function() {
    Route::post('/labs', 'create')
        ->name('labs.create')
        ->middleware('auth:teacher');
});

Route::controller(TestCaseController::class)->group(function() {
    Route::post('/labs/{lab}/test-cases', 'create')
        ->name('labs.test-cases.create')
        ->middleware('auth:teacher');
    Route::get('/labs/{lab}/test-cases', 'index')
        ->name('labs.test-cases.index')
        ->middleware('auth:teacher');
});

Route::controller(HomeController::class)->group(function() {
    Route::get('/', 'index')
        ->name('teacher.index')
        ->middleware('auth:teacher');
});
