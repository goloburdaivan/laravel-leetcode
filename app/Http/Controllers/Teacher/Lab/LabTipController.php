<?php

namespace App\Http\Controllers\Teacher\Lab;

use App\Http\Requests\CreateLabTipRequest;
use App\Models\Lab;
use App\Services\LabService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class LabTipController
{
    public function __construct(
        private readonly LabService $service,
    ) {
    }

    public function store(Lab $lab, CreateLabTipRequest $request): RedirectResponse
    {
        $this->service->addTip($lab, $request);

        return redirect()->route('teacher.course-labs.show', [
            'course' => $lab->course_id,
            'lab' => $lab->id,
        ]);
    }

    public function index(Lab $lab): JsonResponse
    {
        return response()->json([
            'tips' => $this->service->getLabTips($lab),
        ]);
    }
}
