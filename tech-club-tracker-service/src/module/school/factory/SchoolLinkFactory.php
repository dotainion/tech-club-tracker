<?php
namespace src\module\school\factory;

use tools\infrastructure\Factory;
use src\module\school\objects\SchoolLink;
use tools\infrastructure\Collector;

class SchoolLinkFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):SchoolLink{
        return new SchoolLink(
            $this->uuid($record['schoolId']),
            $this->uuid($record['userId']),
            isset($record['hide']) ? $record['hide'] : false
        );
    }
}