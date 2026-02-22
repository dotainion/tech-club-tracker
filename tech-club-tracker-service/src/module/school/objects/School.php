<?php
namespace src\module\school\objects;

use tools\infrastructure\Email;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class School implements IObjects{
    protected Id $id;
    protected string $name;
    protected string $principal;
    protected string $status;
    protected ?Email $email;
    protected string $contact;
    protected Collector $groups;
    protected bool $hide = false;
    protected Collector $schoolLinks;
    protected Collector $linkToGroup;

    public function __construct(
        string $schoolId,
        string $name,
        string $principal,
        string $status,
        string $email,
        string $contact,
        bool $hide
    ){
        $this->id = new Id($schoolId);
        $this->name = $name;
        $this->principal = $principal;
        $this->status = $status;
        $this->email = !empty($email) ? new Email($email) : null;
        $this->contact = $contact;
        $this->groups = new Collector();
        $this->hide = $hide;
        $this->schoolLinks = new Collector();
        $this->linkToGroup = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function name():string{
        return $this->name;
    }

    public function principal():string{
        return $this->principal;
    }

    public function status():string{
        return $this->status;
    }

    public function email():?Email{
        return $this->email;
    }

    public function contact():string{
        return $this->contact;
    }

    public function groups():Collector{
        return $this->groups;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function schoolLinks():Collector{
        return $this->schoolLinks;
    }

    public function students():Collector{
        $students = new Collector();
        foreach($this->groups()->list() as $group){
            $students->mergeCollection($group->students());
        }
        return $students;
    }

    public function linkToGroup():Collector{
        return $this->linkToGroup;
    }
}