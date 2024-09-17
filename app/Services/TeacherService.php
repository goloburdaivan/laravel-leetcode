<?php

namespace App\Services;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Repository\TeacherRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TeacherService
{
    public function __construct(
        private readonly TeacherRepository $repository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function register(RegisterUserRequest $request): void
    {
        $userData = $request->validated();
        $this->repository->create([
            'name' => $userData['name'],
            'surname' => $userData['surname'],
            'password' => $userData['password'],
            'email' => $userData['email'],
        ]);
    }

    public function login(UserLoginRequest $request): bool
    {
        $userData = $request->validated();
        return Auth::guard('teacher')->attempt($userData);
    }

    public function logout(Request $request): void
    {
        Auth::guard('teacher')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
