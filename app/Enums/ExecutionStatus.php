<?php

namespace App\Enums;

enum ExecutionStatus: string
{
    case PROCESSING = "processing";
    case FAILED = "failed";
    case SUCCESS = "success";
}
