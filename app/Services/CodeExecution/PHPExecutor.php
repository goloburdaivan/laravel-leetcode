<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;
use App\Services\CodeExecution\Traits\HasInterpreter;
use Symfony\Component\Process\Process;

class PHPExecutor implements LanguageExecutor
{
    use HasInterpreter;

    public function startContainer(string $containerName, float $memoryLimit): void
    {
        $runProcess = new Process([
            'docker', 'run', '-d',
            '--memory', "{$memoryLimit}m",
            '--name', $containerName, 'php:latest',
            'sleep', 'infinity',
        ]);
        $runProcess->run();

        if (!$runProcess->isSuccessful()) {
            throw new \Exception('Failed to start Docker container: ' . $runProcess->getErrorOutput());
        }
    }

    public function executeCode(
        string $containerName,
        string $sourceCode,
        float $executionTime,
        ?string $input = null
    ): ExecutionResult {
        $sourceCode = str_replace(['<?php', '?>', '?php>'], '', $sourceCode);

        return $this->interpret(
            'php',
            '-r',
            $sourceCode,
            $containerName,
            $executionTime,
            $input,
        );
    }

    public function removeContainer(string $containerName): void
    {
        $removeProcess = new Process([
            'docker', 'rm', '-f', $containerName,
        ]);
        $removeProcess->run();

        if (!$removeProcess->isSuccessful()) {
            throw new \Exception('Failed to remove Docker container: ' . $removeProcess->getErrorOutput());
        }
    }
}
