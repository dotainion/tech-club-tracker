<?php
namespace src\module\report\factory;

use tools\infrastructure\Factory;
use src\module\report\objects\Report;
use src\module\school\factory\SchoolFactory;
use src\module\user\factory\UserFactory;
use tools\infrastructure\Collector;

class ReportFactory extends Collector{
    use Factory;

    protected UserFactory $facilitatorFactory;
    protected SchoolFactory $schoolFactory;
    protected SummaryFactory $summaryFactory;

    public function __construct(){
        $this->facilitatorFactory = new UserFactory();
        $this->schoolFactory = new SchoolFactory();
        $this->summaryFactory = new SummaryFactory();
    }

    public function mapResult($record):Report{
        return new Report(
            $this->uuid($record['reportId']),
            $this->uuid($record['schoolId']),
            $this->uuid($record['facilitatorId']),
            isset($record['reportDate']) ? $record['reportDate'] : $record['date'],
            (string)$record['term'],
            (int)$record['sessions'],
            (string)$record['challenges'],
            (string)$record['successes'],
            (bool)$record['hide'],
            (bool)$record['published'],
            $this->summaryFactory->mapResult($record),
            isset($record['firstName']) ? $this->facilitatorFactory->mapResult($record) : null,
            isset($record['principal']) ? $this->schoolFactory->mapResult($record) : null
        );
    }
}