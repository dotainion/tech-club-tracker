<?php
namespace src\module\attendance\factory;

use src\module\attendance\objects\Attendance;
use src\module\school\factory\GroupFactory;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;

class AttendanceFactory extends Collector implements IFactory{
    protected GroupFactory $factory;

    use Factory;

    public function __construct(){
        $this->factory = new GroupFactory();
    }

    public function mapResult($record):Attendance{
        return new Attendance(
            $this->uuid($record['attendanceId']),
            $this->uuid($record['studentId']),
            $this->uuid($record['groupId']),
            $record['date'],
            isset($record['hide']) ? (bool)$record['hide'] : false,
            isset($record['name']) ? $this->factory->mapResult($record) : null
        );
    }
}