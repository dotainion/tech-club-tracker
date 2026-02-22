<?php
namespace src\module\school\logic;

use src\module\attendance\logic\ListStudents;
use tools\infrastructure\Collector;

class BindStudentDependencies{

    protected ListStudents $students;
    protected ListGroupLinkSchool $schoolLinkSchools;

    public function __construct() {
        $this->students = new ListStudents();
        $this->schoolLinkSchools = new ListGroupLinkSchool();
    }

    public function bindDependencies(Collector &$groups):Collector{
        if($groups->isEmpty()){
            return $groups;
        }
        $students = $this->students->byGroupIdArray($groups->idArray());
        return $this->appendRequirements($groups, $students);
    }

    public function bindDependenciesWithSchools(Collector &$groups, Collector $schools):Collector{
        if($groups->isEmpty() && $schools->isEmpty()){
            return $groups;
        }
        $students = $this->students->byGroupIdArrayAndShoolIdArray($groups->idArray(), $schools->idArray());
        return $this->appendRequirements($groups, $students);
    }

    public function appendRequirements(Collector &$groups, Collector &$students):Collector{
        $links = $this->schoolLinkSchools->byGroupIdArray($groups->idArray());
        foreach($groups->list() as $group){
            foreach($students->list() as $student){
                if($student->studentLinks()->includes($group->id()->toString(), 'groupId')){
                    $group->students()->add($student);
                }
            }
            foreach($links->list() as $link){
                if($group->id()->toString() === $link->groupId()->toString()){
                    $group->linkToSchools()->add($link);
                }
            }
        }
        return $groups;
    }
}