<?php

namespace App\Services\CodeExecution;

class LanguageExecutorFactory
{
    public static function create(string $language): LanguageExecutor
    {
        return match (strtolower($language)) {
            'python' => new PythonExecutor(),
            'cpp' => new CppExecutor(),
            'c' => new CExecutor(),
            'php' => new PHPExecutor(),
            default => throw new \Exception("Unsupported language: $language"),
        };
    }
}
