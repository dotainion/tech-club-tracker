<?php
namespace src\module\school\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class GroupLinkSchool implements IObjects{
    protected Id $schoolId;
    protected Id $groupId;
    protected bool $hide = false;

    public function __construct(string $schoolId, string $groupId, bool $hide){
        $this->schoolId = new Id($schoolId);
        $this->groupId = new Id($groupId);
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->groupId();
    }

    public function schoolId():IId{
        return $this->schoolId;
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function hide():bool{
        return $this->hide;
    }
}