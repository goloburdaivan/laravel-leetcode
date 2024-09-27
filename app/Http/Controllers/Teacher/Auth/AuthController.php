<?php

namespace App\Http\Controllers\Teacher\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Services\TeacherService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;


class AuthController extends Controller
{
    public function __construct(
        private readonly TeacherService $teacherService,
    ) {
    }

    public function index(): InertiaResponse
    {
        return Inertia::render('Teacher/Login');
    }

    public function indexRegister(): InertiaResponse
    {
        return Inertia::render('Teacher/Register');
    }

    /**
     * @throws \Exception
     */
    public function register(RegisterUserRequest $request): RedirectResponse
    {
        $this->teacherService->register($request);

        return response()->redirectTo(route('teacher.auth.index'));
    }

    public function login(UserLoginRequest $request): RedirectResponse
    {
        if (!$this->teacherService->login($request)) {
            return back()->withErrors([
                'email' => 'Invalid credentials.',
            ])->withInput();
        }

        return response()->redirectTo(route('teacher.index'));
    }

    public function logout(Request $request): Response
    {
        $this->teacherService->logout($request);
        return response()->noContent();
    }
}
