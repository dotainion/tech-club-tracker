<?php
namespace src\module\school\logic;

use tools\infrastructure\Collector;

class BindGroupDependencies{

    protected ListGroup $group;
    protected ListSchoolLink $schoolLinks;
    protected ListGroupLinkSchool $groupLinkSchool;

    public function __construct() {
        $this->group = new ListGroup();
        $this->schoolLinks = new ListSchoolLink();
        $this->groupLinkSchool = new ListGroupLinkSchool();
    }

    public function bindDependencies(Collector &$schools):Collector{
        if($schools->isEmpty()){
            return $schools;
        }
        $groupLinkSchools = $this->groupLinkSchool->bySchoolIdArray($schools->idArray());
        $groups = $this->group->byGroupIdArray($groupLinkSchools->attrArray('groupId'));
        $groups = (new BindStudentDependencies())->bindDependenciesWithSchools($groups, $schools);
        $links = $this->schoolLinks->bySchoolIdArray($schools->idArray());
        
        foreach($schools->list() as $school){
            foreach($groups->list() as $group){
                foreach($group->linkToSchools()->list() as $toLink){
                    if($toLink->schoolId()->toString() === $school->id()->toString()){
                        $school->groups()->add($group);
                    }
                    $school->groups()->add($group);
                }
            }
            foreach($links->list() as $link){
                if($link->schoolId()->toString() === $school->id()->toString()){
                    $school->schoolLinks()->add($link);
                }
            }
            foreach($groupLinkSchools->list() as $linked){
                if($school->id()->toString() === $linked->schoolId()->toString()){
                    $school->linkToGroup()->add($linked);
                }
            }
        }
        return $schools;  
    }
}