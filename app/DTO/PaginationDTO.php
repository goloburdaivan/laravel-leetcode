<?php

namespace App\DTO;

class PaginationDTO
{
    public function __construct(
        public array $paginated,
        public int $totalPages,
        public int $perPage,
        public int $page,
    ) {
    }
}
