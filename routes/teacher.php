<?php

use App\Http\Controllers\Teacher\Auth\AuthController;
use App\Http\Controllers\Teacher\Course\CourseController;
use App\Http\Controllers\Teacher\Course\CourseLabsController;
use App\Http\Controllers\Teacher\HomeController;
use App\Http\Controllers\Teacher\Lab\LabSubmissionsController;
use App\Http\Controllers\Teacher\Lab\LabTipController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'index')
        ->name('teacher.auth.index');

    Route::post('/login', 'login')
        ->name('teacher.auth.login');

    Route::get('/register', 'indexRegister')
        ->name('teacher.auth.register-index');

    Route::post('/register', 'register')
        ->name('teacher.auth.register');

    Route::post('/logout', 'logout')
        ->name('teacher.auth.logout');
});

Route::controller(HomeController::class)->group(function() {
    Route::get('/', 'index')
        ->name('teacher.index')
        ->middleware('auth:teacher');
});

Route::controller(CourseController::class)->group(function() {
    Route::post('/courses', 'create')
        ->name('teacher.courses.create')
        ->middleware('auth:teacher');

    Route::get('/courses/{course}', 'show')
        ->name('teacher.courses.show')
        ->middleware('auth:teacher')
        ->can('view', 'course');

    Route::post('/courses/{course}/invite', 'invite')
        ->name('teacher.courses.invite');
});

Route::controller(CourseLabsController::class)->group(function() {
    Route::get('/courses/{course}/labs/create', 'create')
        ->name('teacher.course-labs.create')
        ->middleware('auth:teacher')
        ->can('view', 'course');

    Route::get('/courses/{course}/labs/{lab}', 'show')
        ->name('teacher.course-labs.show')
        ->middleware('auth:teacher')
        ->can('view', 'course');

    Route::put('/courses/{course}/labs/{lab}', 'update')
        ->name('teacher.course-labs.update')
        ->middleware('auth:teacher');

    Route::post('/courses/{course}/labs/store', 'store')
        ->name('teacher.course-labs.store')
        ->middleware('auth:teacher');

    Route::post('/courses/{course}/labs/{lab}/test-cases', 'addTestCase')
        ->name('teacher.course-labs.add-test-case')
        ->middleware('auth:teacher');
});

Route::controller(LabSubmissionsController::class)->group(function() {
    Route::get('/labs/{lab}/submissions', 'index');

    Route::get('/labs/{lab}/submissions/{submission}', 'show');
});

Route::controller(LabTipController::class)->group(function() {
    Route::post('/labs/{lab}/tips', 'store')
        ->name('teacher.lab-tips.store');

    Route::get('/labs/{lab}/tips', 'index')
        ->name('teacher.lab-tips.index');
});
