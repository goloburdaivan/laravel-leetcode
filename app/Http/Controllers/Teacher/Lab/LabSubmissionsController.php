<?php

namespace App\Http\Controllers\Teacher\Lab;

use App\Http\Controllers\Controller;
use App\Http\Requests\Filters\SubmissionFilterRequest;
use App\Models\Lab;
use App\Models\Submission;
use App\Repository\SubmissionRepository;
use App\Services\SubmissionService;
use Illuminate\Http\JsonResponse;

class LabSubmissionsController extends Controller
{
    public function __construct(
        private readonly SubmissionService $service,
    ) {
    }

    public function index(Lab $lab, SubmissionFilterRequest $request): JsonResponse
    {
        $submissions = $this->service->getFilteredSubmissions($lab, $request->query());

        return response()->json([
            'submissions' => $submissions,
        ]);
    }

    public function show(Lab $lab, Submission $submission): JsonResponse
    {
        $submission = $this->service->getSingleSubmission($submission, $lab);

        return response()->json([
            'submission' => $submission,
        ]);
    }
}
