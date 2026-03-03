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
        $groups = $this->appendSchoolLinkRequirements($groups);
        $linkIdArray = $this->extractSchoolIdArray($groups);
        $students = $this->students->byGroupIdArrayAndShoolIdArray($groups->idArray(), $linkIdArray);
        return $this->appendRequirements($groups, $students);
    }

    public function bindDependenciesWithSchools(Collector &$groups, Collector $schools):Collector{
        if($groups->isEmpty() && $schools->isEmpty()){
            return $groups;
        }
        $groups = $this->appendSchoolLinkRequirements($groups);
        $students = $this->students->byGroupIdArrayAndShoolIdArray($groups->idArray(), $schools->idArray());
        return $this->appendRequirements($groups, $students);
    }

    public function appendSchoolLinkRequirements(Collector &$groups):Collector{
        $links = $this->schoolLinkSchools->byGroupIdArray($groups->idArray());
        foreach($groups->list() as $group){
            foreach($links->list() as $link){
                if($group->id()->toString() === $link->groupId()->toString()){
                    $group->linkToSchools()->add($link);
                }
            }
        }
        return $groups;
    }

    public function appendRequirements(Collector &$groups, Collector &$students):Collector{
        foreach($groups->list() as $group){
            foreach($students->list() as $student){
                if($student->studentLinks()->includes($group->id()->toString(), 'groupId')){
                    $group->students()->add($student);
                }
            }
        }
        return $groups;
    }

    public function extractSchoolIdArray(Collector &$groups):array{
        $links = [];
        foreach($groups->list() as $group){
            foreach($group->linkToSchools()->list() as $link){
                $links[] = $link->schoolId();
            }
        }
        return $links;
    }
}