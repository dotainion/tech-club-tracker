<?php
namespace src\module\school\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class SchoolLink implements IObjects{
    protected Id $schoolId;
    protected Id $userId;
    protected bool $hide = false;

    public function __construct(string $schoolId, string $userId, bool $hide){
        $this->schoolId = new Id($schoolId);
        $this->userId = new Id($userId);
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->userId();
    }

    public function schoolId():IId{
        return $this->schoolId;
    }

    public function userId():IId{
        return $this->userId;
    }

    public function hide():bool{
        return $this->hide;
    }
}