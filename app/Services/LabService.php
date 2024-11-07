<?php

namespace App\Services;

use App\DTO\PaginationDTO;
use App\Http\Requests\CreateLabTipRequest;
use App\Http\Requests\CreateTestCaseRequest;
use App\Http\Requests\EditLabRequest;
use App\Models\Course;
use App\Models\Lab;
use App\Models\LabTip;
use App\Models\TestCase;
use App\Models\User;
use App\Repository\LabRepository;
use App\Repository\LabTipRepository;
use App\Repository\TestCaseRepository;
use Illuminate\Database\Eloquent\Collection;

class LabService
{
    public function __construct(
        private readonly LabRepository      $labRepository,
        private readonly TestCaseRepository $testCaseRepository,
        private readonly LabTipRepository   $labTipRepository,
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
        return $this->testCaseRepository->create($request->validated() + [
                'lab_id' => $lab->id,
            ]);
    }

    public function addTip(Lab $lab, CreateLabTipRequest $request): LabTip
    {
        return $this->labTipRepository->create($request->validated() + [
                'lab_id' => $lab->id,
        ]);
    }

    public function getLabWithTestCases(Lab $lab)
    {
        return $this->labRepository->loadTestCases($lab);
    }

    public function getLabWithDetailsForUser(Lab $lab, User $user): ?Lab
    {
        return $this->labRepository
            ->query()
            ->byId($lab->id)
            ->loadRelations([
                'testCases',
                'submissions' => function($query) use ($user) {
                    $query
                        ->where('user_id', $user->id)
                        ->orderByDesc('created_at')
                        ->limit(5);
                },
                'tips',
            ])
            ->first();
    }

    public function getLabTips(Lab $lab): Collection
    {
        return $this->labTipRepository
            ->query()
            ->whereLab($lab->id)
            ->get();
    }

    public function removeTestCase(int $testCaseId): bool
    {
        return $this->testCaseRepository->delete($testCaseId);
    }

    public function getFilteredLabs(Course $course, array $filters = []): PaginationDTO
    {
        return $this->labRepository->query()
            ->byCourse($course->id)
            ->filter($filters)
            ->paginate();
    }
}
