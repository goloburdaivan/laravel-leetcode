<?php

namespace App\Services;

use App\Enums\ExecutionStatus;
use App\Jobs\ExecuteCodeJob;
use App\Models\Lab;
use App\Models\Submission;
use App\Models\User;
use App\Repository\SubmissionRepository;

class SubmissionService
{
    public function __construct(
        private readonly SubmissionRepository $repository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function submit(User $user, Lab $lab, string $sourceCode): Submission
    {
        $submission = $this->repository->create([
            'user_id' => $user->id,
            'lab_id' => $lab->id,
            'source_code' => $sourceCode,
            'status' => ExecutionStatus::PROCESSING,
        ]);

        ExecuteCodeJob::dispatch($submission);

        return $submission;
    }
}
