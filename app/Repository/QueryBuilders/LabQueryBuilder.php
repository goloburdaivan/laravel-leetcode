<?php

namespace App\Repository\QueryBuilders;

use App\Models\Lab;
use App\Repository\Traits\HasPagination;
use Illuminate\Database\Eloquent\Builder;

class LabQueryBuilder
{
    use HasPagination;

    private Builder $query;

    public function __construct()
    {
        $this->query = Lab::query();
    }

    public function byId(int $id): self
    {
        $this->query->where('id', $id);
        return $this;
    }

    public function byCourse(int $courseId): self
    {
        $this->query->where('course_id', $courseId);
        return $this;
    }

    public function byTitle(string $title): self
    {
        $this->query->whereLike('title', $title);
        return $this;
    }

    public function loadRelations(array $relations = []): self
    {
        $this->query->with($relations);
        return $this;
    }

    public function filter(array $args): self
    {
        if (!empty($args['title'])) {
            $this->byTitle($args['title']);
        }

        if (!empty($args['id'])) {
            $this->byId($args['id']);
        }

        return $this;
    }

    public function first(): ?Lab
    {
        return $this->query->first();
    }
}
