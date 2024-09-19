<?php

namespace App\Services;

use App\Http\Requests\CreateTestCaseRequest;
use App\Http\Requests\EditLabRequest;
use App\Models\Course;
use App\Models\Lab;
use App\Models\TestCase;
use App\Repository\LabRepository;
use App\Repository\TestCaseRepository;

class LabService
{
    public function __construct(
        private readonly LabRepository $labRepository,
        private readonly TestCaseRepository $testCaseRepository,
    ) {
    }

    public function create(Course $course, EditLabRequest $request): Lab
    {
        $data = $request->validated();
        return $this->labRepository->create($data + [
                'creator_id' => $request->user()->id,
                'course_id' => $course->id,
        ]);
    }

    public function update(Lab $lab, EditLabRequest $request): Lab
    {
        return $this->labRepository->update($lab, $request->validated());
    }

    /**
     * @throws \Exception
     */
    public function addTestCase(Lab $lab, CreateTestCaseRequest $request): TestCase
    {
        return $this->testCaseRepository->create($lab, $request->validated());
    }

    public function getLabWithTestCases(Lab $lab)
    {
        return $this->labRepository->loadTestCases($lab);
    }
}
