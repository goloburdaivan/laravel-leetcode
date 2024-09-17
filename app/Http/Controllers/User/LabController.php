<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitCodeRequest;
use App\Models\Lab;
use App\Services\SubmissionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LabController extends Controller
{
    public function __construct(
        private readonly SubmissionService $service,
    ) {
    }

    public function submit(Lab $lab, SubmitCodeRequest $request): JsonResponse
    {
        $data = $request->validated();
        $this->service->submit($request->user(), $lab, $data['source_code']);
        return response()->json([
            'success' => true,
            'message' => 'Waiting for code to execute...',
        ]);
    }
}
