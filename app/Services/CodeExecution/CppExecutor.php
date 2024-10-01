<?php

namespace App\Services\CodeExecution;

use App\DTO\ExecutionResult;
use Symfony\Component\Process\Process;

class CppExecutor implements LanguageExecutor
{
    public function startContainer(string $containerName): void
    {
        $runProcess = new Process([
            'docker', 'run', '-d', '--name', $containerName, 'gcc:latest',
            'sleep', 'infinity',
        ]);
        $runProcess->run();

        if (!$runProcess->isSuccessful()) {
            throw new \Exception('Failed to start Docker container: ' . $runProcess->getErrorOutput());
        }
    }

    public function executeCode(string $containerName, string $sourceCode, ?string $input = null): ExecutionResult
    {
        $result = new ExecutionResult();
        $filename = 'main.cpp';
        $tempFile = tempnam(sys_get_temp_dir(), 'cpp_');
        file_put_contents($tempFile, $sourceCode);

        $copyProcess = new Process([
            'docker', 'cp', $tempFile, "$containerName:/tmp/$filename",
        ]);
        $copyProcess->run();

        if (!$copyProcess->isSuccessful()) {
            throw new \Exception('Failed to copy source code to container: ' . $copyProcess->getErrorOutput());
        }

        $compileProcess = new Process([
            'docker', 'exec', $containerName, 'g++', "/tmp/$filename", '-o', '/tmp/a.out',
        ]);

        $compileProcess->run();

        if (!$compileProcess->isSuccessful()) {
            $result->setOutput('');
            $result->setErrorOutput($compileProcess->getErrorOutput());
            $result->setSuccessful(false);
            return $result;
        }

        $runProcess = new Process([
            'docker', 'exec', '-i', $containerName, '/tmp/a.out',
        ]);
        $runProcess->setInput($input . PHP_EOL);
        $runProcess->run();

        $result->setOutput($runProcess->getOutput());
        $result->setErrorOutput($runProcess->getErrorOutput());
        $result->setSuccessful($runProcess->isSuccessful());

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
