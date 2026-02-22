<?php
namespace src\module\report\logic;

use src\infrastructure\NoTimeDateHelper;
use src\module\report\objects\Report;
use src\module\report\repository\ReportRepository;

class AssertReportSetable{

    protected ReportRepository $repo;
    protected NoTimeDateHelper $date;

    public function __construct() {
        $this->repo = new ReportRepository();
        $this->date = new NoTimeDateHelper();
    }

    public function verify(Report $report):bool{
        $yearMonthDay = $this->date->validate($report->date()->toString())->ymd();
        $collector = $this->repo->listReports([
            'schoolId' => $report->schoolId(),
            'published' => false,
            'date' => $yearMonthDay
        ]);
        $collector->assertItemNotExist("There is already a draft report for this month: $yearMonthDay");
        return true;
    }
}