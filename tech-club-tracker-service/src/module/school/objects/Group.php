<?php
namespace src\module\school\objects;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Group implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $description;
    protected ?School $school = null;
    protected Collector $students;
    protected bool $hide = false;
    protected Collector $linkToSchools;

    public function __construct(string $groupId, string $name, string $description, bool $hide){
        $this->id = new Id($groupId);
        $this->name = $name;
        $this->description = $description;
        $this->hide = $hide;
        $this->students = new Collector();
        $this->linkToSchools = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function description():string{
        return $this->description;
    }

    public function students():Collector{
        return $this->students;
    }

    public function school():?School{
        return $this->school;
    }

    public function setSchool(School $school):void{
        $this->school = $school;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function linkToSchools():Collector{
        return $this->linkToSchools;
    }
}