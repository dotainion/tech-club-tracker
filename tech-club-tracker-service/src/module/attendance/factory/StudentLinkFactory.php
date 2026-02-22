<?php
namespace src\module\attendance\factory;

use src\module\attendance\objects\StudentLink;
use src\module\school\factory\GroupFactory;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;

class StudentLinkFactory extends Collector implements IFactory{
    protected GroupFactory $factory;

    use Factory;

    public function __construct(){
        $this->factory = new GroupFactory();
    }

    public function mapResult($record):StudentLink{
        return new StudentLink(
            $this->uuid($record['groupId']),
            $this->uuid($record['studentId']),
            $this->uuid($record['schoolId']),
            isset($record['hide']) ? (bool)$record['hide'] : false,
            isset($record['name']) ? $this->factory->mapResult($record) : null
        );
    }
}