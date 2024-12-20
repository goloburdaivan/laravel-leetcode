<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Lab;
use App\Models\User;
use App\Repository\QueryBuilders\LabQueryBuilder;
use Illuminate\Database\Eloquent\Collection;

class LabRepository extends AbstractRepository
{
    public function getAllByCourse(Course $course): Collection
    {
        return Lab::query()->where('course_id', $course->id)->get();
    }

    public function loadTestCases(Lab $lab): Lab
    {
        return $lab->load('testCases');
    }

    public function getDeadlineLabsForUser(User $user): Collection
    {
        return Lab::query()
            ->whereHas('course', function ($query) use ($user) {
                $query->whereHas('users', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                });
            })
            ->whereDoesntHave('submissions', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('passed', true);
            })
            ->where('due_date', '>=', now())
            ->where('due_date', '<=', now()->addDay())
            ->get();
    }

    public function query(): LabQueryBuilder
    {
        return new LabQueryBuilder();
    }

    public function model(): string
    {
        return Lab::class;
    }
}
