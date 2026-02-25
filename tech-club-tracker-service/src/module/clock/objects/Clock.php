<?php
namespace src\module\clock\objects;

use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Clock implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected DateHelper $in;
    protected ?DateHelper $out;
    protected bool $hide = false;

    public function __construct(string $clockId, string $userId, string $in, ?string $out, bool $hide){
        $this->id = new Id($clockId);
        $this->userId = new Id($userId);
        $this->in = new DateHelper($in);
        $this->out = empty($out) ? null : new DateHelper($out);
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->userId;
    }

    public function in():DateHelper{
        return $this->in;
    }

    public function out():?DateHelper{
        return $this->out;
    }
    public function hide():bool{
        return $this->hide;
    }
}