<?php

namespace App\Http\Controllers\User\Auth;

use App\Constants\Routes;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\UserLoginRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function __construct(
        private readonly UserService $userService,
    ) {
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render('User/Login');
    }

    public function registerIndex(): \Inertia\Response
    {
        return Inertia::render('User/Register');
    }

    /**
     * @throws \Exception
     */
    public function register(RegisterUserRequest $request): RedirectResponse
    {
        $this->userService->register($request);

        return redirect()->route('user.auth.index');
    }

    public function login(UserLoginRequest $request): RedirectResponse
    {
        if (!$this->userService->login($request)) {
            return back()->withErrors([
                'email' => 'Invalid credentials.',
            ])->withInput();
        }

        return response()->redirectTo(Routes::CUSTOMER_HOME);
    }

    public function logout(Request $request): RedirectResponse
    {
        $this->userService->logout($request);
        return redirect()->route('user.auth.index');
    }
}
