<?php
namespace src\module\school\factory;

use tools\infrastructure\Factory;
use src\module\school\objects\School;
use tools\infrastructure\Collector;

class SchoolFactory extends Collector{
    use Factory;

    protected SchoolLinkFactory $factory;

    public function __construct(){
        $this->factory = new SchoolLinkFactory();
    }

    public function mapResult($record):School{
        $school = new School(
            $this->uuid($record['schoolId']),
            (string)$record['name'],
            (string)$record['principal'],
            (string)$record['status'],
            (string)$record['email'],
            (string)$record['contact'],
            isset($record['hide']) ? (bool)$record['hide'] : false
        );
        if(isset($record['userId'])){
            $link = $this->factory->mapResult($record);
            $school->schoolLinks()->add($link);
        }
        return $school;
    }
}