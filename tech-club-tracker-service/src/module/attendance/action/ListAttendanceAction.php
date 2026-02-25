<?php
namespace src\module\attendance\action;

use src\module\attendance\service\ListAttendanceService;
use tools\infrastructure\IAction;
use tools\infrastructure\Request;

class ListAttendanceAction extends Request implements IAction{
    protected $service;

    public function __construct(){
        parent::__REQUEST__();
        $this->service = new ListAttendanceService();
    }

    public function execute(){
        return $this->service->process(
            $this->get('attendanceId'),
            $this->get('studentId'),
            $this->get('groupId'),
            $this->get('date')
        );
    }
}