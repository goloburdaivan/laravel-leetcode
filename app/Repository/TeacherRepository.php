<?php

namespace App\Repository;

use App\Models\Teacher;

class TeacherRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): Teacher
    {
        $teacher = new Teacher();
        return $this->update($teacher, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Teacher $teacher, array $data): Teacher
    {
        $teacher->fill($data);
        if (!$teacher->save()) {
            throw new \Exception("Failed to update teacher!");
        }

        return $teacher;
    }

    public function getWithCourses(Teacher $teacher): Teacher
    {
        return $teacher->load('courses');
    }
}
