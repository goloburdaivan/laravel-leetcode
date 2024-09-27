<?php

namespace App\Repository;

use App\Models\InvitationLog;
use App\Repository\QueryBuilders\InvitationLogQueryBuilder;
use Illuminate\Support\Str;

class InvitationLogRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): InvitationLog
    {
        unset($data['token']);

        $invitation = new InvitationLog();
        return $this->update($invitation, $data + [
            'token' => Str::random(64),
        ]);
    }

    /**
     * @throws \Exception
     */
    public function update(InvitationLog $invitation, array $data): InvitationLog
    {
        $invitation->fill($data);
        if (!$invitation->save()) {
            throw new \Exception("Failed to update invitation log");
        }

        return $invitation;
    }

    public function findByToken(string $token): ?InvitationLog
    {
        return InvitationLog::query()->where('token', $token)->first();
    }

    public function query(): InvitationLogQueryBuilder
    {
        return new InvitationLogQueryBuilder();
    }
}
