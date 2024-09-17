<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Services\TeacherService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function __construct(
        private readonly TeacherService $teacherService,
    ) {
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

    public function login(UserLoginRequest $request): JsonResponse
    {
        if (!$this->teacherService->login($request)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid creds',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged in',
        ]);
    }

    public function logout(Request $request): Response
    {
        $this->teacherService->logout($request);
        return response()->noContent();
    }
}
