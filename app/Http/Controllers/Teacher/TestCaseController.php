<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTestCaseRequest;
use App\Models\Lab;
use App\Repository\TestCaseRepository;
use Illuminate\Http\JsonResponse;

class TestCaseController extends Controller
{
    public function __construct(
        private readonly TestCaseRepository $repository,
    ) {
    }

    public function index(Lab $lab): JsonResponse
    {
        $testCases = $this->repository->getTestCases($lab);
        return response()->json([
            'test_cases' => $testCases,
        ]);
    }

    public function create(Lab $lab, CreateTestCaseRequest $request): JsonResponse
    {
        $data = $request->validated();
        $case = $this->repository->create($data + [
            'lab_id' => $lab->id,
        ]);

        return response()->json([
            'test_case' => $case,
        ]);
    }
}
