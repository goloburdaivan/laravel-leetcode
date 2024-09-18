<?php

namespace App\Http\Requests;

use Illuminate\Http\Request as LaravelRequest;
class Request extends LaravelRequest
{
    public const TEACHER_AREA_PREFIX = 'teacher';

    public function isTeacherArea(): bool
    {
        $prefix = $this->route()->getPrefix() ?: '';
        return trim($prefix, '/') === self::TEACHER_AREA_PREFIX;
    }
}
