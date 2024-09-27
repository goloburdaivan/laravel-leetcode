<?php

namespace App\Http\Controllers\User\Course;

use App\Exception\AcceptException;
use App\Http\Controllers\Controller;
use App\Http\Requests\AcceptCourseInvitationRequest;
use App\Services\CourseInviteAcceptanceService;
use Illuminate\Http\RedirectResponse;

class CourseController extends Controller
{
    public function __construct(
        private readonly CourseInviteAcceptanceService $acceptanceService,
    ) {
    }

    public function acceptInvite(AcceptCourseInvitationRequest $request): RedirectResponse
    {
        try {
            $this->acceptanceService->accept($request);

            return redirect()->route('user.index');
        } catch (AcceptException $exception) {
            return redirect()->route('user.index')->with('error', $exception->getMessage());
        }
    }
}
