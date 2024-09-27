<?php
namespace App\Repository\QueryBuilders;

use App\Models\Submission;
use App\Repository\Traits\HasPagination;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class SubmissionQueryBuilder
{
    use HasPagination;

    protected Builder $query;

    public function __construct()
    {
        $this->query = Submission::query();
    }

    public function byId(int $id): self
    {
        $this->query->where('id', $id);
        return $this;
    }

    public function forLab(int $labId): self
    {
        $this->query->where('lab_id', $labId);
        return $this;
    }

    public function withUser(): self
    {
        $this->query->with('user');
        return $this;
    }

    public function applyFilters(array $args = []): self
    {
        if (!empty($args['student_name'])) {
            $this->query->whereRelation('user', 'name', $args['student_name']);
        }

        if (!empty($args['status'])) {
            $this->query->where('status', $args['status']);
        }

        if (!empty($args['student_id'])) {
            $this->query->whereRelation('user', 'id', $args['student_id']);
        }

        return $this;
    }

    public function get(): Collection
    {
        return $this->query->get();
    }

    public function first(): ?Submission
    {
        return $this->query->first();
    }
}
