<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;
use App\Services\CodeExecution\Traits\HasInterpreter;
use Symfony\Component\Process\Process;

class PythonExecutor implements LanguageExecutor
{
    use HasInterpreter;

    /**
     * @throws \Exception
     */
    public function startContainer(string $containerName): void
    {
        $runProcess = new Process([
            'docker', 'run', '-d', '--name', $containerName, 'python:3.9',
            'sleep', 'infinity',
        ]);
        $runProcess->run();

        if (!$runProcess->isSuccessful()) {
            throw new \Exception('Failed to start Docker container: ' . $runProcess->getErrorOutput());
        }
    }

    public function executeCode(string $containerName, string $sourceCode, ?string $input = null): ExecutionResult
    {
        return $this->interpret(
            'python',
            '-c',
            $sourceCode,
            $containerName,
            $input
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
