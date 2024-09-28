<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class CourseRepository
{
    public function create(Teacher $teacher, array $data): Course
    {
        $course = new Course();
        return $this->update($course, $data + [
                'teacher_id' => $teacher->id,
            ]);
    }

    public function update(Course $course, array $data): Course
    {
        $course->fill($data);
        if (!$course->save()) {
            throw new \Exception("Failed to update course");
        }

        return $course;
    }

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
}
