<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;
use App\Services\CodeExecution\Traits\HasCompilation;
use App\Services\CodeExecution\Traits\HasFileCreation;
use Symfony\Component\Process\Process;

class CExecutor implements LanguageExecutor
{
    use HasFileCreation;
    use HasCompilation;

    public function startContainer(string $containerName, float $memoryLimit): void
    {
        $runProcess = new Process([
            'docker', 'run', '-d',
            '--memory', "{$memoryLimit}m",
            '--name', $containerName,
            'gcc:latest',
            'sleep', 'infinity',
        ]);
        $runProcess->run();

        if (!$runProcess->isSuccessful()) {
            throw new \Exception('Failed to start Docker container: ' . $runProcess->getErrorOutput());
        }
    }

    /**
     * @throws \Exception
     */
    public function executeCode(
        string $containerName,
        string $sourceCode,
        float $executionTime,
        ?string $input = null
    ): ExecutionResult {
        $tempFile = $this->createFile('main.c', $sourceCode, $containerName);
        $result = $this->compile(
            'main.c',
            'a.out',
            'gcc',
            $containerName,
            $executionTime,
            $input,
        );

        unlink($tempFile);
        return $result;
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
