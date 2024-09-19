<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditLabRequest;
use App\Http\Requests\CreateTestCaseRequest;
use App\Models\Course;
use App\Models\Lab;
use App\Repository\LabRepository;
use App\Repository\TestCaseRepository;
use App\Services\LabService;
use App\Services\TestCaseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseLabsController extends Controller
{
    public function __construct(
        private readonly LabService $labService,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function store(Course $course, EditLabRequest $request): RedirectResponse
    {
        $lab = $this->labService->create($course, $request);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $course->id,
            'lab' => $lab->id,
        ]);
    }

    public function show(Course $course, Lab $lab): Response
    {
        $lab = $this->labService->getLabWithTestCases($lab);
        return Inertia::render('Teacher/Lab/Show', [
            'lab' => $lab,
        ]);
    }

    /**
     * @throws \Exception
     */
    public function update(Course $course, Lab $lab, EditLabRequest $request): RedirectResponse
    {
        $this->labService->update($lab, $request);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $course->id,
            'lab' => $lab->id,
        ]);
    }

    /**
     * @throws \Exception
     */
    public function addTestCase(Course $course, Lab $lab, CreateTestCaseRequest $request): RedirectResponse
    {
        $this->labService->addTestCase($lab, $request);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $course->id,
            'lab' => $lab->id,
        ]);
    }

    public function create(Course $course): Response
    {
        return Inertia::render('Teacher/Lab/Create', [
            'course' => $course,
        ]);
    }
}
