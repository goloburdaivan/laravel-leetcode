<?php

namespace App\Repository;

use App\Models\Lab;
use App\Models\TestCase;
use Illuminate\Database\Eloquent\Collection;

class TestCaseRepository extends AbstractRepository
{
    public function getTestCases(Lab $lab): Collection
    {
        return $lab->testCases;
    }

    public function model(): string
    {
        return TestCase::class;
    }
}
