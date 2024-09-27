<?php

namespace App\Http\Controllers\Teacher\Lab;

use App\Http\Controllers\Controller;
use App\Http\Requests\Filters\SubmissionFilterRequest;
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

    public function index(Lab $lab, SubmissionFilterRequest $request): JsonResponse
    {
        $submissions = $this->repository
            ->query()
            ->forLab($lab->id)
            ->withUser()
            ->applyFilters($request->query())
            ->paginate();

        return response()->json([
            'submissions' => $submissions,
        ]);
    }

    public function show(Lab $lab, Submission $submission): JsonResponse
    {
        $submission = $this->repository
            ->query()
            ->byId($submission->id)
            ->forLab($lab->id)
            ->withUser()
            ->first();

        return response()->json([
            'submission' => $submission,
        ]);
    }
}
