<?php

namespace App\Repository;

use App\Models\LabTip;
use App\Repository\QueryBuilders\LabTipQueryBuilder;

class LabTipRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): LabTip
    {
        $tip = new LabTip();
        return $this->update($tip, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(LabTip $tip, array $data): LabTip
    {
        $tip->fill($data);
        if (!$tip->save()) {
            throw new \Exception("Failed to update lab tip");
        }

        return $tip;
    }

    public function query(): LabTipQueryBuilder
    {
        return new LabTipQueryBuilder();
    }

}
