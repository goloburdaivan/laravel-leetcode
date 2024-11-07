<?php

namespace App\Repository;

use App\Models\Teacher;

class TeacherRepository extends AbstractRepository
{
    public function getWithCourses(Teacher $teacher): Teacher
    {
        return $teacher->load('courses');
    }

    public function model(): string
    {
        return Teacher::class;
    }
}
