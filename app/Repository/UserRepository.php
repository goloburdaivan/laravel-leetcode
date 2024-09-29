<?php

namespace App\Repository;

use App\Models\User;
use App\Repository\QueryBuilders\UserQueryBuilder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class UserRepository
{
    /**
     * @throws \Exception
     */
    public function create(array $data): User
    {
        $user = new User();
        return $this->update($user, $data);
    }

    /**
     * @throws \Exception
     */
    public function update(User $user, array $data): User
    {
        $user->fill($data);
        if (!$user->save()) {
            throw new \Exception("Failed to update user!");
        }

        return $user;
    }

    public function query(): UserQueryBuilder
    {
        return new UserQueryBuilder();
    }

    public function getTopStudents(): Collection
    {
        return User::query()
            ->select(
                'users.id',
                'users.name',
                DB::raw('COUNT(DISTINCT submissions.lab_id) as passed_labs_count')
            )
            ->join('submissions', 'users.id', '=', 'submissions.user_id')
            ->where('submissions.passed', true)
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('passed_labs_count')
            ->limit(10)
            ->get();
    }

}
