<?php

namespace App\Http\Controllers\Teacher\Course;

use App\Exception\InviteException;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\Filters\LabFilterRequest;
use App\Http\Requests\InviteUserRequest;
use App\Models\Course;
use App\Repository\CourseRepository;
use App\Repository\LabRepository;
use App\Services\CourseInvitationService;
use App\Services\CourseService;
use App\Services\LabService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseService $service,
        private readonly LabService $labService,
        private readonly CourseInvitationService $invitationService,
    ) {
    }

    public function create(CreateCourseRequest $request): RedirectResponse
    {
        $this->service->create($request->user(), $request);

        return Redirect::route('teacher.index', status: 303);
    }

    public function show(Course $course, LabFilterRequest $request): Response
    {
        $labs = $this->labService->getFilteredLabs($course, $request->query());

        return Inertia::render('Teacher/Course/Index', [
            'course' => $course,
            'labs' => $labs,
        ]);
    }

    public function invite(Course $course, InviteUserRequest $request): JsonResponse
    {
        try {
            $this->invitationService->invite($course, $request);
            return response()->json([
                'success' => true,
                'message' => 'User invited to course' . $course->title,
            ]);
        } catch (InviteException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to invite user to course: ' . $exception->getMessage(),
            ], 422);
        }
    }
}
