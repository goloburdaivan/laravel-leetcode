<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Repository\TeacherRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly TeacherRepository $repository,
    ) {
    }

    public function index(Request $request): Response
    {
        $teacher = $this->repository->getWithCourses($request->user());
        return Inertia::render('Teacher/Homepage/Index', [
            'teacher' => $teacher,
        ]);
    }
}
