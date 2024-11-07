<?php

namespace App\Services;

use App\DTO\PaginationDTO;
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

    public function getFilteredSubmissions(Lab $lab, array $filters = []): PaginationDTO
    {
        return $this->repository
            ->query()
            ->forLab($lab->id)
            ->withUser()
            ->applyFilters($filters)
            ->paginate();
    }

    public function getSingleSubmission(Submission $submission, Lab $lab): Submission
    {
        return $this->repository
            ->query()
            ->byId($submission->id)
            ->forLab($lab->id)
            ->withUser()
            ->first();
    }
}
