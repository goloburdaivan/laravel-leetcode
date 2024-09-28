<?php

namespace App\Jobs;

use App\Enums\ExecutionStatus;
use App\Models\Submission;
use App\Repository\SubmissionRepository;
use App\Repository\TestCaseRepository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Symfony\Component\Process\Process;

class ExecuteCodeJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private readonly Submission $submission,
    ) {
    }

    /**
     * Execute the job.
     * @throws \Exception
     */
    public function handle(
        SubmissionRepository $repository,
        TestCaseRepository $testCaseRepository,
    ): void {
        $containerName = 'submission' . $this->submission->id;
        $runProcess = new Process([
            'docker', 'run', '-d', '--name', $containerName, 'python:3.9',
            'sleep', 'infinity',
        ]);
        $runProcess->run();

        if (!$runProcess->isSuccessful()) {
            throw new \Exception('Failed to start Docker container: ' . $runProcess->getErrorOutput());
        }

        $testCases = $testCaseRepository->getTestCases($this->submission->lab);
        $allPassed = true;

        foreach ($testCases as $testCase) {
            $testProcess = new Process([
                'docker', 'exec', '-i', $containerName, 'python', '-c', $this->submission->source_code,
            ]);
            $testProcess->setInput($testCase->input . PHP_EOL);
            $testProcess->run();

            if (!$testProcess->isSuccessful()) {
                $repository->update($this->submission, [
                    'output' => $testProcess->getErrorOutput(),
                    'passed' => false,
                    'status' => ExecutionStatus::FAILED,
                ]);
                $removeProcess = new Process([
                    'docker', 'rm', '-f', $containerName,
                ]);
                $removeProcess->run();
                return;
            }

            $output = trim($testProcess->getOutput());
            if ($output === trim($testCase->expected_output)) {
                $repository->update($this->submission, [
                    'tests_passed' => $this->submission->tests_passed + 1,
                    'output' => $this->submission->output ? $this->submission->output . PHP_EOL . $output : $output,
                ]);
            } else {
                $allPassed = false;
                $repository->update($this->submission, [
                    'output' => $this->submission->output ? $this->submission->output . PHP_EOL . $output : $output,
                ]);
            }

        }

        $removeProcess = new Process([
            'docker', 'rm', '-f', $containerName,
        ]);
        $removeProcess->run();

        if (!$removeProcess->isSuccessful()) {
            throw new \Exception('Failed to remove Docker container: ' . $removeProcess->getErrorOutput());
        }

        $repository->update($this->submission, [
            'passed' => $allPassed,
            'status' => ExecutionStatus::SUCCESS,
        ]);
    }
}
