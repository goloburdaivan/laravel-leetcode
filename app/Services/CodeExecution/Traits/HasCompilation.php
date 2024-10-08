<?php

namespace App\Services\CodeExecution\Traits;

use App\DTO\ExecutionResult;
use Symfony\Component\Process\Process;

trait HasCompilation
{
    public function compile(
        string $filename,
        string $executableName,
        string $compiler,
        string $container,
        ?string $input = null,
    ): ExecutionResult {
        $result = new ExecutionResult();
        $compileProcess = new Process([
            'docker', 'exec', $container, $compiler, "/tmp/$filename", '-o', "/tmp/$executableName",
        ]);

        $compileProcess->run();

        if (!$compileProcess->isSuccessful()) {
            $result->setOutput('');
            $result->setErrorOutput($compileProcess->getErrorOutput());
            $result->setSuccessful(false);
            return $result;
        }

        $runProcess = new Process([
            'docker', 'exec', '-i', $container, "/tmp/$executableName",
        ]);
        $runProcess->setInput($input . PHP_EOL);
        $runProcess->run();

        $result->setOutput($runProcess->getOutput());
        $result->setErrorOutput($runProcess->getErrorOutput());
        $result->setSuccessful($runProcess->isSuccessful());

        return $result;
    }
}
