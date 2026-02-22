<?php
namespace src\module\report\factory;

use src\module\report\objects\FocusArea;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;

class FocusAreaFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):FocusArea{
        return new FocusArea(
            $this->uuid($record['focusAreaId']),
            $this->uuid($record['reportId']),
            $this->uuid($record['groupId']),
            (string)$record['topic'],
            (string)$record['date'],
            (string)$record['lessonDetail'],
            (string)$record['engagement'],
            (string)$record['resources'],
            isset($record['hide']) ? $record['hide'] : false
        );
    }
}