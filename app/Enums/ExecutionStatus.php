<?php

namespace App\Enums;

enum ExecutionStatus: string
{
    case PROCESSING = "processing";
    case FAILED = "failed";
    case SUCCESS = "success";

    public static function getLists(): array
    {
        return [
            self::PROCESSING->value => 'Processing',
            self::FAILED->value => 'Failed',
            self::SUCCESS->value => 'Success',
        ];
    }
}
