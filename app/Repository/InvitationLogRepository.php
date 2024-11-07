<?php

namespace App\Repository;

use App\Models\InvitationLog;
use App\Repository\QueryBuilders\InvitationLogQueryBuilder;

class InvitationLogRepository extends AbstractRepository
{
    public function findByToken(string $token): ?InvitationLog
    {
        return InvitationLog::query()->where('token', $token)->first();
    }

    public function query(): InvitationLogQueryBuilder
    {
        return new InvitationLogQueryBuilder();
    }

    public function model(): string
    {
        return InvitationLog::class;
    }
}
