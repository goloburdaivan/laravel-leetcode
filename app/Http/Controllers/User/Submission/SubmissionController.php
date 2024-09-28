<?php

namespace App\Http\Controllers\User\Submission;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Repository\SubmissionRepository;
use Illuminate\Http\JsonResponse;

class SubmissionController extends Controller
{
    public function __construct(
        private readonly SubmissionRepository $repository,
    ) {
    }

    public function status(Submission $submission): JsonResponse
    {
        return response()->json([
            'status' => $submission->status,
        ]);
    }

    public function show(Submission $submission): JsonResponse
    {
        $submission = $this->repository
            ->query()
            ->byId($submission->id)
            ->first();

        return response()->json([
            'submission' => $submission,
        ]);
    }
}
