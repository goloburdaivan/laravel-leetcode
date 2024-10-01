<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;
use Symfony\Component\Process\Process;

class PythonExecutor implements LanguageExecutor
{
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
        $testProcess = new Process([
            'docker', 'exec', '-i', $containerName, 'python', '-c', $sourceCode,
        ]);
        $testProcess->setInput($input . PHP_EOL);
        $testProcess->run();

        $result = new ExecutionResult();
        $result->setOutput($testProcess->getOutput());
        $result->setErrorOutput($testProcess->getErrorOutput());
        $result->setSuccessful($testProcess->isSuccessful());

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
