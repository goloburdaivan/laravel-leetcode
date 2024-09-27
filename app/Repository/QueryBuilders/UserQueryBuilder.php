<?php

namespace App\Repository\QueryBuilders;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserQueryBuilder
{
    private Builder $query;

    public function __construct()
    {
        $this->query = User::query();
    }

    public function byId(int $id): self
    {
        $this->query->where('id', $id);

        return $this;
    }

    public function first(): ?User
    {
        return $this->query->first();
    }
}
