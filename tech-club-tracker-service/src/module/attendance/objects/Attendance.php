<?php
namespace src\module\attendance\objects;

use src\module\school\objects\Group;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Attendance implements IObjects{
    protected Id $id;
    protected Id $studentId;
    protected Id $groupId;
    protected DateHelper $date;
    protected bool $hide = false;
    protected ?Group $group = null;

    public function __construct(string $attendanceId, string $studentId, string $groupId, string $date, bool $hide, ?Group $group=null){
        $this->id = new Id($attendanceId);
        $this->studentId = new Id($studentId);
        $this->groupId = new Id($groupId);
        $this->date = new DateHelper($date);
        $this->hide = $hide;
        $this->group = $group;
    }

    public function id():IId{
        return $this->id;
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function studentId():IId{
        return $this->studentId;
    }

    public function date():DateHelper{
        return $this->date;
    }
    public function hide():bool{
        return $this->hide;
    }

    public function group():?Group{
        return $this->group;
    }
}