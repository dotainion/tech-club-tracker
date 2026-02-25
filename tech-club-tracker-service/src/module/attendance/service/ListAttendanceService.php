<?php
namespace src\module\attendance\service;

use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\attendance\logic\ListAttendance;

class ListAttendanceService extends Service{
    protected ListAttendance $attendance;

    public function __construct(){
        parent::__construct();
        $this->attendance = new ListAttendance();
    }
    
    public function process($attendanceId, $studentId, $groupId, $date){
        $attendanceId = (new Id())->isValid($attendanceId) ? new Id($attendanceId) : null;
        $studentId = (new Id())->isValid($studentId) ? new Id($studentId) : null;
        $groupId = (new Id())->isValid($groupId) ? new Id($groupId) : null;

        $collector = $this->attendance->list($attendanceId, $studentId, $groupId, $date);
        $collector->assertHasItem('No attendance found.');
        
        $this->setOutput($collector);
        return $this;
    }
}