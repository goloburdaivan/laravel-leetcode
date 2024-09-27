<?php

namespace App\Services;

use App\Exception\InviteException;
use App\Http\Requests\InviteUserRequest;
use App\Mail\UserInvitedToCourse;
use App\Models\Course;
use App\Repository\InvitationLogRepository;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Mail;

class CourseInvitationService
{
    public function __construct(
        private readonly UserRepository          $userRepository,
        private readonly InvitationLogRepository $invitationLogRepository,
    )
    {
    }

    public function invite(Course $course, InviteUserRequest $request): void
    {
        $data = $request->validated();
        $user = $this->userRepository
            ->query()
            ->byId($data['user_id'])
            ->first();

        if (!$user) {
            throw new InviteException("User not found");
        }

        $invitation = $this->invitationLogRepository
            ->query()
            ->find($course->id, $user->id)
            ->first();

        if ($invitation?->confirmed) {
            throw new InviteException("User already confirmed invite to course");
        }

        if ($invitation && now()->lessThan($invitation?->expires_at)) {
            throw new InviteException(
                "You can send next invite to user after "
                . floor(now()->diffInHours($invitation->expires_at, true))
                . "h"
            );
        }

        $log = $this->invitationLogRepository->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'expires_at' => now()->addDay(),
        ]);

        Mail::to($user)
            ->queue(new UserInvitedToCourse(
                $course,
                $user,
                $log->token,
            ));
    }
}
