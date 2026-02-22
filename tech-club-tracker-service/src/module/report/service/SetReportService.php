<?php
namespace src\module\report\service;

use src\infrastructure\NoTimeDateHelper;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\report\factory\FocusAreaFactory;
use src\module\report\factory\ReportFactory;
use src\module\report\logic\AssertReportSetable;
use src\module\report\logic\ListReports;
use src\module\report\logic\SetReport;

class SetReportService extends Service{
    protected ReportFactory $factory;
    protected FocusAreaFactory $faFactory;
    protected SetReport $report;
    protected ListReports $list;
    protected AssertReportSetable $setable;

    public function __construct(){
        parent::__construct();
        $this->factory = new ReportFactory();
        $this->faFactory = new FocusAreaFactory();
        $this->report = new SetReport();
        $this->list = new ListReports();
        $this->setable = new AssertReportSetable();
    }
    
    public function process(
        //report
        $reportId,
        $schoolId,
        $facilitatorId,
        $term,
        $date,
        $sessions,
        $challenges,
        $successes,
        $hide,
        $published,
        //summary
        $beginner,
        $intermediate,
        $advanced,
        //focus areas as an associated array with kyes of:
        //focusAreas = [focusAreaId, reportId, groupId, topic, date, lessonDetail, engagement, resources]
        $focusAreas
    ){
        Assert::validUuid($schoolId, 'School not found.');
        Assert::validUuid($facilitatorId, 'Facilitator not found.');
        Assert::isArray($focusAreas, 'Dev Error: FocusAreas can only an array of objects');

        $date = new NoTimeDateHelper($date, 'Invalid report date.');
        $reportId = (new Id())->isValid($reportId) ? new Id($reportId) : (new Id())->new();

        $report = $this->factory->mapResult([
            //report
            'reportId' => $reportId->toString(),
            'schoolId' => $schoolId,
            'facilitatorId' => $facilitatorId,
            'date' => $date->toString(),
            'term' => $term,
            'sessions' => $sessions,
            'challenges' => $challenges,
            'successes' => $successes,
            'hide' => $hide,
            'published' => $published,
            //summary
            'beginner' => $beginner,
            'intermediate' => $intermediate,
            'advanced' => $advanced
        ]);

        $this->setable->verify($report);

        foreach($focusAreas as $key => $focusArea){
            $section = $key +1;
            $message = count($focusAreas) > 1 ? "In [Focus Areas] section $section, the" : 'The';
            
            $focusAreaId = (new Id())->isValid($focusArea['focusAreaId'])
                ? $focusArea['focusAreaId']
                : (new Id())->new()->toString();

            Assert::stringNotEmpty($focusArea['topic'], "$message topic field must be completed.");
            $focusAreaDate = (new NoTimeDateHelper($focusArea['date'], "$message date field must be completed."));
            $report->published() && Assert::stringNotEmpty($focusArea['lessonDetail'], "$message lessonDetail field must becompleted.");
            Assert::validUuid($focusArea['groupId'], "$message A valid group must be selected.");
            $report->published() && Assert::stringNotEmpty($focusArea['engagement'], "$message engagement field must be completed.");
            $report->published() && Assert::stringNotEmpty($focusArea['resources'], "$message resources field must be completed.");
            
            $report->focusAreas()->add(
                $this->faFactory->mapResult([
                    'focusAreaId' => $focusAreaId,
                    'reportId' => $report->id()->toString(),
                    'groupId' => $focusArea['groupId'],
                    'topic' => $focusArea['topic'],
                    'date' => $focusAreaDate->toString(),
                    'lessonDetail' => $focusArea['lessonDetail'],
                    'engagement' => $focusArea['engagement'],
                    'resources' => $focusArea['resources'],
                    'hide' => $report->hide()
                ])
            );
        }

        $this->report->set($report);
        
        if($report->hide()){
            $this->setOutput($report);
            return $this;
        }
        $this->list->requst()->unset('date');
        
        $collector = $this->list->list($report->id());
        $this->setOutput($collector);
        return $this;
    }
}