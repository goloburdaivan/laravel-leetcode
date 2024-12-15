<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;

interface LanguageExecutor
{
    public function startContainer(string $containerName, float $memoryLimit): void;
    public function executeCode(string $containerName, string $sourceCode, float $executionTime, ?string $input = null): ExecutionResult;
    public function removeContainer(string $containerName): void;
}
