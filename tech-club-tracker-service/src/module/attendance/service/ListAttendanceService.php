<?php
namespace src\module\attendance\service;

use InvalidArgumentException;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\attendance\logic\ListAttendance;

class ListAttendanceService extends Service{
    protected ListAttendance $attendance;

    public function __construct(){
        parent::__construct();
        $this->attendance = new ListAttendance();
    }
    
    public function process($attendanceId, $studentId, $roomId, $all){
        $attendanceId = (new Id())->isValid($attendanceId) ? new Id($attendanceId) : null;
        $studentId = (new Id())->isValid($studentId) ? new Id($studentId) : null;
        $roomId = (new Id())->isValid($roomId) ? new Id($roomId) : null;

        if(!$attendanceId && !$studentId && !$roomId && !$all){
            throw new InvalidArgumentException('No results');
        }

        $collector = $this->attendance->list($attendanceId, $studentId, $roomId);
        
        $this->setOutput($collector);
        return $this;
    }
}