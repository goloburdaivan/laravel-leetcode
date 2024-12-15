<?php

namespace App\Services\CodeExecution\Traits;

use App\DTO\ExecutionResult;
use Symfony\Component\Process\Exception\ProcessTimedOutException;
use Symfony\Component\Process\Process;

trait HasInterpreter
{
    public function interpret(
        string $interpreter,
        string $flag,
        string $sourceCode,
        string $container,
        float $executionTime,
        ?string $input = null,
    ): ExecutionResult {
        $interpreterProcess = new Process([
            'docker', 'exec', '-i', $container, $interpreter, $flag, $sourceCode,
        ]);
        $interpreterProcess->setInput($input . PHP_EOL);
        $interpreterProcess->setTimeout($executionTime);

        $result = new ExecutionResult();

        try {
            $interpreterProcess->run();
            $result->setOutput($interpreterProcess->getOutput());
            $result->setErrorOutput($interpreterProcess->getErrorOutput());
            $result->setSuccessful($interpreterProcess->isSuccessful());
        } catch (ProcessTimedOutException $exception) {
            $result->setOutput("Time limit exceeded");
            $result->setErrorOutput($exception->getMessage());
            $result->setSuccessful(false);
        }

        return $result;
    }
}
