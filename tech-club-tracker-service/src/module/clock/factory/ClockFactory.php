<?php
namespace src\module\clock\factory;

use src\module\clock\objects\Clock;
use tools\infrastructure\Factory;
use tools\infrastructure\Collector;

class ClockFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Clock{
        return new Clock(
            $this->uuid($record['clockId']),
            $this->uuid($record['userId']),
            (string)$record['in'],
            (string)$record['out'],
            isset($record['hide']) ? (bool)$record['hide'] : false
        );
    }
}