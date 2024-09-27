<?php

namespace App\Services;

use App\Exception\AcceptException;
use App\Http\Requests\AcceptCourseInvitationRequest;
use App\Repository\CourseMemberRepository;
use App\Repository\InvitationLogRepository;

class CourseInviteAcceptanceService
{
    public function __construct(
        private readonly CourseMemberRepository $memberRepository,
        private readonly InvitationLogRepository $logRepository,
    ) {
    }

    public function accept(AcceptCourseInvitationRequest $request)
    {
        $data = $request->validated();
        $log = $this->logRepository->findByToken($data['token']);
        if (!$log) {
            throw new AcceptException("Token is invaliad");
        }

        if (now()->greaterThan($log->expires_at)) {
            throw new AcceptException("Token expired");
        }

        if ($log->confirmed) {
            throw new AcceptException("Invitation already accepted");
        }

        $this->memberRepository->create([
            'user_id' => $log->user_id,
            'course_id' => $log->course_id,
        ]);

        $this->logRepository->update($log, [
            'confirmed' => true,
        ]);
    }
}
