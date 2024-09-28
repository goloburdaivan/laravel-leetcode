<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Submission;
use App\Models\User;
use App\Repository\QueryBuilders\SubmissionQueryBuilder;
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

    public function getLastUserSubmissions(User $user): Collection
    {
        return Submission::query()
            ->whereRelation('user', 'user_id', $user->id)
            ->with('lab')
            ->withCount('testCases')
            ->limit(5)
            ->get();
    }

    public function getLastUserSubmissionsByCourse(User $user, Course $course): Collection
    {
        return Submission::query()
            ->whereRelation('user', 'user_id', $user->id)
            ->whereRelation('lab.course', 'id', $course->id)
            ->with('lab')
            ->withCount('testCases')
            ->limit(5)
            ->get();
    }

    public function getSubmissionsStatsForCourse(User $user, Course $course): ?Submission
    {
        return Submission::query()
            ->whereRelation('user', 'user_id', $user->id)
            ->whereRelation('lab.course', 'id', $course->id)
            ->selectRaw("
                COUNT(*) as total_submissions,
                SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful_submissions,
                SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed_submissions"
            )
            ->first();
    }

    public function query(): SubmissionQueryBuilder
    {
        return new SubmissionQueryBuilder();
    }
}
