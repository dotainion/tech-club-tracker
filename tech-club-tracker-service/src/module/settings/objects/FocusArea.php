<?php
namespace src\module\report\objects;

use src\module\school\objects\Group;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class FocusArea implements IObjects{
    protected Id $id;
    protected Id $reportId;
    protected Id $groupId;
    protected string $topic;
    protected DateHelper $date;
    protected string $lessonDetail;
    protected ?Group $group = null;
    protected string $engagement;
    protected string $resources;
    protected bool $hide;

    public function __construct(
        string $focusAreaId,
        string $reportId,
        string $groupId,
        string $topic,
        string $date,
        string $lessonDetail,
        string $engagement,
        string $resources,
        bool $hide
    ){
        $this->id = new Id($focusAreaId);
        $this->reportId = new Id($reportId);
        $this->groupId = new Id($groupId);
        $this->topic = $topic;
        $this->date = new DateHelper($date);
        $this->lessonDetail = $lessonDetail;
        $this->engagement = $engagement;
        $this->resources = $resources;
        $this->hide = $hide;
    }

    public function id():IId{
        return $this->id;
    }

    public function reportId():IId{
        return $this->reportId;
    }

    public function groupId():IId{
        return $this->groupId;
    }

    public function topic():string{
        return $this->topic;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function lessonDetail():string{
        return $this->lessonDetail;
    }

    public function engagement():string{
        return $this->engagement;
    }

    public function resources():string{
        return $this->resources;
    }

    public function group():?Group{
        return $this->group;
    }

    public function setGroup(Group $group):void{
        $this->group = $group;
    }

    public function hide():bool{
        return $this->hide;
    }
}