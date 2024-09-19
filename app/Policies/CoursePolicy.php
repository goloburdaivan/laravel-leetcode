<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
    use HandlesAuthorization;

    public function view(Teacher $teacher, Course $course)
    {
        return $course->teacher_id === $teacher->id;
    }
}
