<?php

namespace App\Repository\QueryBuilders;

use App\Models\LabTip;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class LabTipQueryBuilder
{
    private Builder $query;

    public function __construct()
    {
        $this->query = LabTip::query();
    }

    public function whereLab(int $labId): self
    {
        $this->query->where('lab_id', $labId);
        return $this;
    }

    public function get(): Collection
    {
        return $this->query->get();
    }
}
