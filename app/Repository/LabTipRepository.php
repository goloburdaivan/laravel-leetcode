<?php

namespace App\Repository;

use App\Models\LabTip;
use App\Repository\QueryBuilders\LabTipQueryBuilder;

class LabTipRepository extends AbstractRepository
{
    public function query(): LabTipQueryBuilder
    {
        return new LabTipQueryBuilder();
    }

    public function model(): string
    {
        return LabTip::class;
    }
}
