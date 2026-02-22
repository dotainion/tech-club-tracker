<?php
namespace src\module\settings\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\settings\objects\Settings;

class SettingsFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Settings{
        return new Settings(
            $this->uuid($record['userId']),
            (bool)$record['isActive'],
            (bool)$record['checkAttendance'],
            (bool)$record['manageSchoolGroupStudent'],
            (bool)$record['generateReports'],
            (bool)$record['isAdmin'],
            (bool)$record['manageUsers'],
            (bool)$record['viewReports'],
            (bool)$record['sendNotifications']
        );
    }
}