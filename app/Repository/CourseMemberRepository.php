<?php

namespace App\Repository;

use App\Models\CourseMember;
use App\Models\Teacher;

class CourseMemberRepository
{
    public function create(array $data): CourseMember
    {
        $member = new CourseMember();
        return $this->update($member, $data);
    }

    public function update(CourseMember $member, array $data): CourseMember
    {
        $member->fill($data);
        if (!$member->save()) {
            throw new \Exception("Failed to update CourseMember");
        }

        return $member;
    }
}
