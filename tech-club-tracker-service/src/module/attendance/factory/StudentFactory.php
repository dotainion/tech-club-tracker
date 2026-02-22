<?php
namespace src\module\attendance\factory;

use src\module\attendance\objects\Student;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;

class StudentFactory extends Collector implements IFactory{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Student{
        return new Student(
            $this->uuid($record['studentId']),
            $record['firstName'] ?? '',
            $record['lastName'] ?? '',
            $record['email'] ?? '',
            $record['contact'] ?? '',
            $record['gender'] ?? '',
            $record['dob'] ?? '',
            $record['grade'] ?? '',
            $record['status'] ?? '',
            isset($record['hide']) ? (bool)$record['hide'] : false
        );
    }
}