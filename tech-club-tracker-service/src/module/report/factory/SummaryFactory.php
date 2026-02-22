<?php
namespace src\module\report\factory;

use tools\infrastructure\Factory;
use src\module\report\objects\Summary;
use tools\infrastructure\Collector;

class SummaryFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Summary{
        return new Summary(
            $this->uuid($record['reportId']),
            (int)$record['beginner'],
            (int)$record['intermediate'],
            (int)$record['advanced'],
            isset($record['hide']) ? $record['hide'] : false
        );
    }
}