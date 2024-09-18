<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    private const TEACHER_AREA_PREFIX = 'teacher';

    protected function redirectTo(Request $request)
    {
        if (!$request->expectsJson()) {
            return match (true) {
                $this->isTeacherArea($request) => route('teacher.auth.index'),
                default => route('user.auth.index'),
            };
        }

        return parent::redirectTo($request);
    }

    public function isTeacherArea(Request $request): bool
    {
        $prefix = $request->route()->getPrefix() ?: '';
        return trim($prefix, '/') === self::TEACHER_AREA_PREFIX;
    }
}
