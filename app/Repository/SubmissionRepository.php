<?php

namespace App\Repository;

use App\Models\Lab;
use App\Models\Submission;

class SubmissionRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): Submission
    {
        $submission = new Submission();
        return $this->update($submission, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Submission $submission, array $data): Submission
    {
        $submission->fill($data);
        if (!$submission->save()) {
            throw new \Exception("Failed to update submission");
        }

        return $submission;
    }
}
