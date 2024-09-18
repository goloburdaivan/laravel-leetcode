<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCourseRequest;
use App\Repository\CourseRepository;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseRepository $repository,
    ) {
    }

    public function create(CreateCourseRequest $request): JsonResponse
    {
        $data = $request->validated();
        $this->repository->create($request->user(), $data);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully',
        ]);
    }
}
