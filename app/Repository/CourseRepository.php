<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class CourseRepository extends AbstractRepository
{

    public function getUserCourses(User $user): Collection
    {
        return Course::query()
            ->whereRelation('users', 'users.id', $user->id)
            ->withCount(['labs as labs_with_passed_submissions_count' => function ($query) use ($user) {
                $query->whereHas('submissions', function ($subQuery) use ($user) {
                    $subQuery->where('passed', true)
                        ->where('user_id', $user->id);
                });
            }])
            ->withCount('labs')
            ->get();
    }

    public function loadCourseProgress(User $user, Course $course): ?Course
    {
        return Course::query()
            ->where('id', $course->id)
            ->whereRelation('users', 'users.id', $user->id)
            ->withCount(['labs as labs_with_passed_submissions_count' => function ($query) use ($user) {
                $query->whereHas('submissions', function ($subQuery) use ($user) {
                    $subQuery->where('passed', true)
                        ->where('user_id', $user->id);
                });
            }])
            ->withCount('labs')
            ->first();
    }

    public function model(): string
    {
        return Course::class;
    }
}
