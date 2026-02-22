<?php
namespace src\module\attendance\action;

use tools\infrastructure\IAction;
use tools\infrastructure\Request;
use src\module\attendance\service\SetAttendanceService;

class SetAttendanceAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new SetAttendanceService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('attendanceId'),
            $this->get('studentId'),
            $this->get('groupId'),
            $this->get('dateValue'),
            $this->get('hide')
        );
    }
}