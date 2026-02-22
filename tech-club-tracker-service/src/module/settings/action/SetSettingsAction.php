<?php
namespace src\module\settings\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\settings\service\SetSettingsService;

class SetSettingsAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetSettingsService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('userId'),
            $this->get('isActive'),
            $this->get('checkAttendance'),
            $this->get('manageSchoolGroupStudent'),
            $this->get('generateReports'),
            $this->get('isAdmin'),
            $this->get('manageUsers'),
            $this->get('viewReports'),
            $this->get('sendNotifications'),
            $this->get('read'),
            $this->get('write'),
            $this->get('edit'),
            $this->get('delete')
        );
    }
}