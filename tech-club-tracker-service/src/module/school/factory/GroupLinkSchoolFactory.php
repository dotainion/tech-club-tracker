<?php
namespace src\module\school\factory;

use src\module\school\objects\GroupLinkSchool;
use tools\infrastructure\Factory;
use tools\infrastructure\Collector;

class GroupLinkSchoolFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):GroupLinkSchool{
        return new GroupLinkSchool(
            $this->uuid($record['schoolId']),
            $this->uuid($record['groupId']),
            isset($record['hide']) ? $record['hide'] : false
        );
    }
}