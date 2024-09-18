<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Teacher;

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
}
