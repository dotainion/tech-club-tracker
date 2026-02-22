<?php
namespace src\module\settings\repository;

use src\infrastructure\Repository;
use src\module\settings\factory\SettingsFactory;
use src\module\settings\objects\Settings;
use tools\infrastructure\Collector;

class SettingsRepository extends Repository{
    protected SettingsFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SettingsFactory();
    }
    
    public function create(Settings $settings):void{
        $this->insert('settings')
            ->column('userId', $this->uuid($settings->id()))
            ->column('isActive', $settings->isActive())
            ->column('checkAttendance', $settings->checkAttendance())
            ->column('manageSchoolGroupStudent', $settings->manageSchoolGroupStudent())
            ->column('generateReports', $settings->generateReports())
            ->column('isAdmin', $settings->isAdmin())
            ->column('manageUsers', $settings->manageUsers())
            ->column('viewReports', $settings->viewReports())
            ->column('sendNotifications', $settings->sendNotifications());
        $this->execute();
    }
    
    public function edit(Settings $settings):void{
        $this->update('settings')
            ->column('isActive', $settings->isActive())
            ->column('checkAttendance', $settings->checkAttendance())
            ->column('manageSchoolGroupStudent', $settings->manageSchoolGroupStudent())
            ->column('generateReports', $settings->generateReports())
            ->column('isAdmin', $settings->isAdmin())
            ->column('manageUsers', $settings->manageUsers())
            ->column('viewReports', $settings->viewReports())
            ->column('sendNotifications', $settings->sendNotifications())
            ->where()->eq('userId', $this->uuid($settings->id()));
        $this->execute();
    }

    public function listSettings(array $where = []):Collector{
        $this->select('settings');

        if(isset($where['userId'])){
            $this->where()->eq('userId', $this->uuid($where['userId']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}