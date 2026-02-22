<?php
namespace src\module\attendance\logic;

use src\module\attendance\repository\StudentLinkRepository;
use tools\infrastructure\Collector;

class BindAttendanceDependencies{

    protected StudentLinkRepository $links;
    protected ListAttendance $attendances;

    public function __construct() {
        $this->links = new StudentLinkRepository();
        $this->attendances =new ListAttendance();
    }

    public function bindDependencies(Collector &$students):Collector{
        if($students->isEmpty()){
            return $students;
        }
        $links = $this->links->listStudentLink([
            'studentId' => $students->idArray()
        ]);
        $attendances = $this->attendances->bySchoolIdArray($students->idArray());
        foreach($students->list() as $student){
            foreach($attendances->list() as $attendance){
                if($student->id()->toString() === $attendance->studentId()->toString()){
                    $student->attendances()->add($attendance);
                }
            }
            foreach($links->list() as $link){
                if($student->id()->toString() === $link->studentId()->toString()){
                    $student->studentLinks()->add($link);
                }
            }
        }
        return $students;
    }
}