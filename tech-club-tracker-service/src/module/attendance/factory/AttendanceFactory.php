<?php
namespace src\module\attendance\factory;

use src\module\attendance\objects\Attendance;
use src\module\school\factory\GroupFactory;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;

class AttendanceFactory extends Collector implements IFactory{
    protected GroupFactory $factory;
    protected StudentFactory $studentFactory;

    use Factory;

    public function __construct(){
        $this->factory = new GroupFactory();
        $this->studentFactory = new StudentFactory();
    }

    public function mapResult($record):Attendance{
        return new Attendance(
            $this->uuid($record['attendanceId']),
            $this->uuid($record['studentId']),
            $this->uuid($record['groupId']),
            isset($record['attendanceDate']) ? $record['attendanceDate'] : $record['date'],
            isset($record['hide']) ? (bool)$record['hide'] : false,
            $this->studentFactory->mapResult($record),
            isset($record['name']) ? $this->factory->mapResult($record) : null
        );
    }
}