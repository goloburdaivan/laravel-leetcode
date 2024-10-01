<?php

namespace App\DTO;

class ExecutionResult
{
    private string $output;
    private string $errorOutput;
    private bool $isSuccessful;

    public function getOutput(): string
    {
        return $this->output;
    }

    public function setOutput(string $output): void
    {
        $this->output = $output;
    }

    public function getErrorOutput(): string
    {
        return $this->errorOutput;
    }

    public function setErrorOutput(string $errorOutput): void
    {
        $this->errorOutput = $errorOutput;
    }

    public function isSuccessful(): bool
    {
        return $this->isSuccessful;
    }

    public function setSuccessful(bool $isSuccessful): void
    {
        $this->isSuccessful = $isSuccessful;
    }
}
