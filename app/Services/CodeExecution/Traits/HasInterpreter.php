<?php

namespace App\Services\CodeExecution\Traits;

use App\DTO\ExecutionResult;
use Symfony\Component\Process\Process;

trait HasInterpreter
{
    public function interpret(
        string $interpreter,
        string $flag,
        string $sourceCode,
        string $container,
        ?string $input = null,
    ): ExecutionResult {
        $interpreterProcess = new Process([
            'docker', 'exec', '-i', $container, $interpreter, $flag, $sourceCode,
        ]);
        $interpreterProcess->setInput($input . PHP_EOL);
        $interpreterProcess->run();

        $result = new ExecutionResult();
        $result->setOutput($interpreterProcess->getOutput());
        $result->setErrorOutput($interpreterProcess->getErrorOutput());
        $result->setSuccessful($interpreterProcess->isSuccessful());

        return $result;
    }
}
