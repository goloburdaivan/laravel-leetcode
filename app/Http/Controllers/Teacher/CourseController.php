<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Models\Course;
use App\Repository\CourseRepository;
use App\Repository\LabRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseRepository $repository,
        private readonly LabRepository $labRepository,
    ) {
    }

    public function create(CreateCourseRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $course = $this->repository->create($request->user(), $data);

        return Redirect::route('teacher.index', status: 303);
    }

    public function show(Course $course): Response
    {
        $labs = $this->labRepository->getAllByCourse($course);
        return Inertia::render('Teacher/Course/Index', [
            'labs' => $labs,
        ]);
    }
}
