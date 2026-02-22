<?php
namespace src\module\attendance\logic;

use src\module\attendance\repository\StudentRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\IObjects;

class BindAttendanceDependency{

    protected StudentRepository $studentsRepo;

    public function __construct() {
        $this->studentsRepo = new StudentRepository();
    }

    public function bindDependencyObject(IObjects &$object):IObjects{
        $collector = new Collector();
        $collector->add($object);
        $this->bindDependencies($collector, null);
        return $collector->first();
    }

    public function bindDependencies(Collector &$collector):Collector{
        if($collector->isEmpty()){
            return $collector;
        }
        $students = $this->studentsRepo->listStudents([
            'roomId' => $collector->attrArray('roomId'),
        ]);
        foreach($collector->list() as $attendance){
            foreach($students->list() as $student){
                if($attendance->roomId()->toString() === $student->roomId()->toString()){
                    $attendance->setStudent($student);
                    break;
                }
            }
        }
        return $collector;
    }
}