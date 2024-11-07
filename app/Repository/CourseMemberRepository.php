<?php

namespace App\Repository;

use App\Models\CourseMember;
use App\Models\Teacher;

class CourseMemberRepository extends AbstractRepository
{
    public function model(): string
    {
        return CourseMember::class;
    }
}
