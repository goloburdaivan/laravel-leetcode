<?php

namespace App\Http\Controllers\User\Lab;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubmitCodeRequest;
use App\Models\Lab;
use App\Repository\LabRepository;
use App\Services\LabService;
use App\Services\SubmissionService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class LabController extends Controller
{
    public function __construct(
        private readonly LabService $labService,
        private readonly SubmissionService $submissionService,
    ) {
    }

    public function show(Lab $lab): Response
    {
        $lab = $this->labService->getLabWithDetails($lab);

        return Inertia::render('User/Lab/Index', [
            'lab' => $lab,
        ]);
    }

    /**
     * @throws \Exception
     */
    public function submit(Lab $lab, SubmitCodeRequest $request): JsonResponse
    {
        $data = $request->validated();
        $submission = $this->submissionService->submit($request->user(), $lab, $data['source_code']);
        return response()->json([
            'success' => true,
            'submission_id' => $submission->id,
            'message' => 'Waiting for code to execute...',
        ]);
    }
}
