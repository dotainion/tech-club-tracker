<?php
namespace src\module\attendance\objects;

use src\module\school\objects\Group;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class StudentLink implements IObjects{
    protected Id $groupId;
    protected Id $studentId;
    protected Id $schoolId;
    protected bool $hide = false;
    protected ?Group $group;

    public function __construct(string $groupId, string $studentId, string $schoolId, bool $hide, ?Group $group=null){
        $this->groupId = new Id($groupId);
        $this->studentId = new Id($studentId);
        $this->schoolId = new Id($schoolId);
        $this->hide = $hide;
        $this->group = $group;
    }

    public function id():IId{
        return $this->groupId();
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function schoolId():IId{
        return $this->schoolId;
    }

    public function studentId():IId{
        return $this->studentId;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function group():?Group{
        return $this->group;
    }
}