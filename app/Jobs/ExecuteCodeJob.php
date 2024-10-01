<?php

namespace App\Jobs;

use App\Enums\ExecutionStatus;
use App\Models\Submission;
use App\Repository\SubmissionRepository;
use App\Repository\TestCaseRepository;
use App\Services\CodeExecution\LanguageExecutorFactory;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

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
        $language = $this->submission->lab->language;
        $executor = LanguageExecutorFactory::create($language);

        $containerName = 'submission' . $this->submission->id;

        try {
            $executor->startContainer($containerName);
            $testCases = $testCaseRepository->getTestCases($this->submission->lab);
            $allPassed = true;

            foreach ($testCases as $testCase) {
                $result = $executor->executeCode(
                    $containerName,
                    $this->submission->source_code,
                    $testCase->input
                );

                if (!$result->isSuccessful()) {
                    $repository->update($this->submission, [
                        'output' => $result->getErrorOutput(),
                        'passed' => false,
                        'status' => ExecutionStatus::FAILED,
                    ]);
                    return;
                }

                $output = trim($result->getOutput());
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

            $repository->update($this->submission, [
                'passed' => $allPassed,
                'status' => ExecutionStatus::SUCCESS,
            ]);
        } catch (\Exception $e) {
            $repository->update($this->submission, [
                'output' => $e->getMessage(),
                'passed' => false,
                'status' => ExecutionStatus::FAILED,
            ]);
        } finally {
            $executor->removeContainer($containerName);
        }
    }
}
