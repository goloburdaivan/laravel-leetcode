<?php

namespace App\Repository;

use App\Models\Lab;

class LabRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): Lab
    {
        $lab = new Lab();
        return $this->update($lab, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(Lab $lab, array $data): Lab
    {
        $lab->fill($data);
        if (!$lab->save()) {
            throw new \Exception("Failed to update lab");
        }

        return $lab;
    }
}
