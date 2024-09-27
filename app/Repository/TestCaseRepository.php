<?php

namespace App\Repository;

use App\Models\Lab;
use App\Models\TestCase;
use Illuminate\Database\Eloquent\Collection;

class TestCaseRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): TestCase
    {
        $case = new TestCase();
        return $this->update($case, $data);
    }

    public function update(TestCase $case, array $data): TestCase
    {
        $case->fill($data);
        if (!$case->save()) {
            throw new \Exception("Failed to update test case");
        }

        return $case;
    }

    public function getTestCases(Lab $lab): Collection
    {
        return $lab->testCases;
    }
}
