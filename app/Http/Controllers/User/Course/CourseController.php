<?php

namespace App\Http\Controllers\User\Course;

use App\Exception\AcceptException;
use App\Http\Controllers\Controller;
use App\Http\Requests\AcceptCourseInvitationRequest;
use App\Models\Course;
use App\Repository\CourseRepository;
use App\Repository\LabRepository;
use App\Repository\SubmissionRepository;
use App\Services\CourseInviteAcceptanceService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseInviteAcceptanceService $acceptanceService,
        private readonly CourseRepository $courseRepository,
        private readonly LabRepository $labRepository,
        private readonly SubmissionRepository $submissionRepository,
    ) {
    }

    public function index(Course $course): Response
    {
        $labs = $this->labRepository
            ->getAllByCourse($course);

        $submissions = $this->submissionRepository
            ->getLastUserSubmissionsByCourse(auth('user')->user(), $course);

        $stats = $this->submissionRepository
            ->getSubmissionsStatsForCourse(auth('user')->user(), $course);

        $courseProgress = $this->courseRepository
            ->loadCourseProgress(auth('user')->user(), $course);

        return Inertia::render('User/Course/Index', [
            'labs' => $labs,
            'submissions' => $submissions,
            'stats' => $stats,
            'progress' => $courseProgress,
        ]);
    }

    public function acceptInvite(AcceptCourseInvitationRequest $request): RedirectResponse
    {
        try {
            $this->acceptanceService->accept($request);

            return redirect()->route('user.index');
        } catch (AcceptException $exception) {
            return redirect()->route('user.index')->with('error', $exception->getMessage());
        }
    }
}
