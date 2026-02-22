<?php
namespace src\module\report\objects;

use src\module\school\objects\School;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;
use tools\infrastructure\IUser;

class Report implements IObjects{
    protected Id $id;
    protected Id $schoolId;
    protected Id $facilitatorId;
    protected DateHelper $date;
    protected string $term;
    protected int $sessions;
    protected string $challenges;
    protected string $successes;
    protected bool $hide;
    protected bool $published;
    protected ?IUser $facilitator;
    protected ?School $school;
    protected Summary $summary;
    protected Collector $focusAreas;

    public function __construct(
        string $reportId,
        string $schoolId,
        string $facilitatorId,
        string $date,
        string $term,
        int $sessions,
        string $challenges,
        string $successes,
        bool $hide,
        bool $published,
        Summary $summary,
        ?IUser $facilitator,
        ?School $school
    ){
        $this->id = new Id($reportId);
        $this->schoolId = new Id($schoolId);
        $this->facilitatorId = new Id($facilitatorId);
        $this->date = new DateHelper($date);
        $this->term = $term;
        $this->sessions = $sessions;
        $this->challenges = $challenges;
        $this->successes = $successes;
        $this->hide = $hide;
        $this->published = $published;
        $this->facilitator = $facilitator;
        $this->school = $school;
        $this->summary = $summary;
        $this->focusAreas = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function schoolId():IId{
        return $this->schoolId;
    }

    public function facilitatorId():IId{
        return $this->facilitatorId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function term():string{
        return $this->term;
    }

    public function sessions():int{
        return $this->sessions;
    }

    public function challenges():string{
        return $this->challenges;
    }

    public function successes():string{
        return $this->successes;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function published():bool{
        return $this->published;
    }

    public function facilitator():?IUser{
        return $this->facilitator;
    }

    public function school():?School{
        return $this->school;
    }

    public function summary():Summary{
        return $this->summary;
    }

    public function focusAreas():Collector{
        return $this->focusAreas;
    }
}