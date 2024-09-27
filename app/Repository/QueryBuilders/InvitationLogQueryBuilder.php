<?php

namespace App\Repository\QueryBuilders;

use App\Models\InvitationLog;
use Illuminate\Database\Eloquent\Builder;

class InvitationLogQueryBuilder
{
    private Builder $query;

    public function __construct()
    {
        $this->query = InvitationLog::query();
    }

    public function latest(): self
    {
        $this->query->orderByDesc('expires_at');
        return $this;
    }

    public function confirmed(): self
    {
        $this->query->where('confirmed', true);
        return $this;
    }

    public function find(int $courseId, int $userId): self
    {
        $this->query
            ->where('course_id', $courseId)
            ->where('user_id', $userId);

        return $this;
    }

    public function first(): ?InvitationLog
    {
        return $this->query->first();
    }
}
