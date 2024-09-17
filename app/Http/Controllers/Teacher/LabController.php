<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateLabRequest;
use App\Repository\LabRepository;
use Illuminate\Http\JsonResponse;

class LabController extends Controller
{
    public function __construct(
        private readonly LabRepository $repository,
    ) {
    }

    /**
     * @throws \Exception
     */
    public function create(CreateLabRequest $request): JsonResponse
    {
        $data = $request->validated();
        $lab = $this->repository->create($data);

        return response()->json([
            'lab' => $lab,
        ], 201);
    }
}
