<?php

namespace App\Repository;

use App\Models\Lab;
use App\Models\Submission;
use Illuminate\Database\Eloquent\Collection;

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

    public function getSubmissionsByLab(Lab $lab): Collection
    {
        return Submission::query()->where('lab_id', $lab->id)->with('user')->get();
    }

    public function getWithUser(Submission $submission): Submission
    {
        return $submission->load('user');
    }
}
