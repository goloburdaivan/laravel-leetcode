<?php

namespace App\Services;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Models\User;
use App\Repository\LabRepository;
use App\Repository\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function __construct(
        private readonly UserRepository $repository,
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
        return Auth::guard('user')->attempt($userData);
    }

    public function logout(Request $request): void
    {
        Auth::guard('user')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
