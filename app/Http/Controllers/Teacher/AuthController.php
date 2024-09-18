<?php

namespace App\Http\Controllers\Teacher;

use App\Constants\Routes;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Services\TeacherService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;


class AuthController extends Controller
{
    public function __construct(
        private readonly TeacherService $teacherService,
    ) {
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render('Teacher/Login');
    }

    /**
     * @throws \Exception
     */
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $this->teacherService->register($request);

        return response()->json([
            'success' => true,
            'message' => 'User registered',
        ]);
    }

    public function login(UserLoginRequest $request): RedirectResponse
    {
        if (!$this->teacherService->login($request)) {
            return back()->withErrors([
                'email' => 'Invalid credentials.',
            ])->withInput();
        }

        return response()->redirectTo(Routes::TEACHER_HOME);
    }

    public function logout(Request $request): Response
    {
        $this->teacherService->logout($request);
        return response()->noContent();
    }
}
