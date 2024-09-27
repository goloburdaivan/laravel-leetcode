<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Request;
use App\Repository\CourseRepository;
use App\Repository\LabRepository;
use App\Repository\SubmissionRepository;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly LabRepository $labRepository,
        private readonly CourseRepository $courseRepository,
        private readonly SubmissionRepository $submissionRepository,
    )
    {
    }

    public function index(): Response
    {
        $deadlineLabs = $this->labRepository->getDeadlineLabsForUser(auth('user')->user());
        $courses = $this->courseRepository->getUserCourses(auth('user')->user());
        $submissions = $this->submissionRepository->getLastUserSubmissions(auth('user')->user());

        return Inertia::render('User/Homepage/Index', [
            'labs' => $deadlineLabs,
            'courses' => $courses,
            'submissions' => $submissions,
        ]);
    }
}
