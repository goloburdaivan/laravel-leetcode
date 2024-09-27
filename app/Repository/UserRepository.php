<?php

namespace App\Repository;

use App\Models\User;
use App\Repository\QueryBuilders\UserQueryBuilder;

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
}
