<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateLabRequest;
use App\Http\Requests\CreateTestCaseRequest;
use App\Models\Course;
use App\Models\Lab;
use App\Repository\LabRepository;
use App\Repository\TestCaseRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseLabsController extends Controller
{
    public function __construct(
        private readonly LabRepository $repository,
        private readonly TestCaseRepository $testCaseRepository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function store(Course $course, CreateLabRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $lab = $this->repository->create($data + [
            'creator_id' => $request->user()->id,
            'course_id' => $course->id,
        ]);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $course->id,
            'lab' => $lab->id,
        ]);
    }

    public function show(Course $course, Lab $lab): Response
    {
        return Inertia::render('Teacher/Lab/Show', [
            'lab' => $lab,
        ]);
    }

    public function addTestCase(Course $course, Lab $lab, CreateTestCaseRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $this->testCaseRepository->create($lab, $data);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $course->id,
            'lab' => $lab->id,
        ]);
    }

    public function create(Course $course): Response
    {
        return Inertia::render('Teacher/Lab/Create');
    }
}
