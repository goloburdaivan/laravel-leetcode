<?php

namespace App\Services\CodeExecution\Traits;

use Symfony\Component\Process\Process;

trait HasFileCreation
{
    /**
     * @throws \Exception
     */
    public function createFile(string $filename, string $sourceCode, string $container): string
    {
        $tempFile = tempnam(sys_get_temp_dir(), 'c_');
        file_put_contents($tempFile, $sourceCode);

        $copyProcess = new Process([
            'docker', 'cp', $tempFile, "$container:/tmp/$filename",
        ]);
        $copyProcess->run();

        if (!$copyProcess->isSuccessful()) {
            throw new \Exception('Failed to copy source code to container: ' . $copyProcess->getErrorOutput());
        }

        return $tempFile;
    }
}
