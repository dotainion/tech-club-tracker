<?php
namespace src\module\school\factory;

use tools\infrastructure\Factory;
use src\module\school\objects\Group;
use tools\infrastructure\Collector;

class GroupFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Group{
        return new Group(
            $this->uuid($record['groupId']),
            (string)$record['name'],
            (string)$record['description'],
            isset($record['hide']) ? (bool)$record['hide'] : false
        );
    }
}