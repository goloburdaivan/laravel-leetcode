<?php

namespace App\Repository;

use App\Models\Course;
use App\Models\Lab;
use Illuminate\Database\Eloquent\Collection;

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

    public function getAllByCourse(Course $course): Collection
    {
        return Lab::query()->where('course_id', $course->id)->get();
    }

    public function loadTestCases(Lab $lab): Lab
    {
        return $lab->load('testCases');
    }
}
