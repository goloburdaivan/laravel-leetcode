<?php

namespace App\Services;

use App\Http\Requests\CreateCourseRequest;
use App\Models\Course;
use App\Models\Teacher;
use App\Repository\CourseRepository;

class CourseService
{
    public function __construct(
        private readonly CourseRepository $courseRepository,
    ) {
    }

    public function create(Teacher $teacher, CreateCourseRequest $request): Course
    {
        $data = $request->validated();
        return $this->courseRepository->create($data + [
                'teacher_id' => $teacher->id,
            ]);
    }
}
