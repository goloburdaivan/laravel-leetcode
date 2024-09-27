<?php

namespace App\Repository\Traits;

use App\DTO\PaginationDTO;

trait HasPagination
{
    public function paginate(int $perPage = 10): PaginationDTO
    {
        $result = $this->query->paginate($perPage);
        return new PaginationDTO(
            $result->items(),
            ceil($result->total() / $result->perPage()),
            $result->perPage(),
            $result->currentPage(),
        );
    }
}
