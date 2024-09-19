<?php

namespace App\Http\Controllers;

use App\Models\Lab;
use App\Models\Submission;
use App\Repository\SubmissionRepository;
use Illuminate\Http\JsonResponse;

class LabSubmissionsController extends Controller
{
    public function __construct(
        private readonly SubmissionRepository $repository,
    ) {
    }

    public function index(Lab $lab): JsonResponse
    {
        $submissions = $this->repository->getSubmissionsByLab($lab);
        return response()->json([
            'submissions' => $submissions,
        ]);
    }

    public function show(Lab $lab, Submission $submission): JsonResponse
    {
        $submission = $this->repository->getWithUser($submission);
        return response()->json([
            'submission' => $submission,
        ]);
    }
}
