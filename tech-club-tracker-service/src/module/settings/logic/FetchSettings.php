<?php
namespace src\module\settings\logic;

use src\module\settings\factory\SettingsFactory;
use src\module\settings\objects\Settings;
use src\module\settings\repository\SettingsRepository;
use tools\infrastructure\Id;

class FetchSettings{

    protected SettingsRepository $repo;
    protected SettingsFactory $factory;
    protected bool $useDefaultIfSettingsNotExist = false;

    public function __construct() {
        $this->repo =new SettingsRepository();
        $this->factory = new SettingsFactory();
    }

    public function useDefaultIfSettingsNotExist():self{
        $this->useDefaultIfSettingsNotExist = true;
        return $this;
    }

    public function byUserId(Id $userId):Settings{
        $collector = $this->repo->listSettings([
            'userId' => $userId,
        ]);
        if($collector->isEmpty() && $this->useDefaultIfSettingsNotExist){
            return $this->defaultSettings($userId);
        }
        return $collector->first();
    }

    public function defaultSettings(Id $userId):Settings{
        return $this->factory->mapResult([
            'userId' => $userId->toString(),
            'isActive' => true,
            'checkAttendance' => true,
            'manageSchoolGroupStudent' => false,
            'generateReports' => false,
            'isAdmin' => false,
            'manageUsers' => false,
            'viewReports' => false,
            'sendNotifications' => false
        ]);
    }
}