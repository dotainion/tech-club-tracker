<?php
namespace src\module\school\service;

use InvalidArgumentException;
use src\infrastructure\Service;
use src\module\school\logic\ListGroup;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;

class ListGroupService extends Service{
    protected ListGroup $group;

    public function __construct(){
        parent::__construct();
        $this->group = new ListGroup();
    }
    
    public function process($groupId, $schoolId, $date){
        //date here is uses in attendance logic, pulled via request
        //its here to show dev what was passed
        
        $groupId && Assert::validUuid($groupId, 'Group not found.');
        $schoolId && Assert::validUuid($schoolId, 'School not found.');

        if($groupId && $schoolId){
            throw new InvalidArgumentException('Dev Error: cant use both groupId and schoolId. Use one or the other.');
        }

        if($groupId){
            $collector = $this->group->byGroupId(new Id($groupId));
        }else if($schoolId){
            $collector = $this->group->bySchoolId(new Id($schoolId));
        }else{
            $collector = $this->group->list();
        }
        $collector->assertHasItem('No available group.');

        $this->setOutput($collector);
        return $this;
    }  
}