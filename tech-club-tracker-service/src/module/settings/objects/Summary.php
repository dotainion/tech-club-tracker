<?php
namespace src\module\report\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Summary implements IObjects{
    protected Id $id;
    protected Id $reportId;
    protected int $beginner;
    protected int $intermediate;
    protected int $advanced;
    protected bool $hide;

    public function __construct(
        string $reportId,
        int $beginner,
        int $intermediate,
        int $advanced,
        bool $hide
    ){
        $this->id = new Id($reportId);
        $this->beginner = $beginner;
        $this->intermediate = $intermediate;
        $this->advanced = $advanced;
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }

    public function reportId():IId{
        return $this->reportId;
    }

    public function beginner():int{
        return $this->beginner;
    }

    public function intermediate():int{
        return $this->intermediate;
    }

    public function advanced():int{
        return $this->advanced;
    }

    public function total():int{
        return $this->beginner() + $this->intermediate() + $this->advanced();
    }

    public function hide():bool{
        return $this->hide;
    }
}