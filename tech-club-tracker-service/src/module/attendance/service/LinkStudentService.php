<?php
namespace src\module\attendance\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\attendance\factory\StudentLinkFactory;
use src\module\attendance\logic\SetStudentLink;

class LinkStudentService extends Service{
    protected SetStudentLink $link;
    protected StudentLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->link = new SetStudentLink();
        $this->factory = new StudentLinkFactory();
    }
    
    public function process($studentId, $schoolId, $groupId){
        Assert::validUuid($studentId, 'Student not found.');
        Assert::validUuid($schoolId, 'School not found.');
        Assert::validUuid($groupId, 'Group not found.');

        $link = $this->factory->mapResult([
            'studentId' => $studentId,
            'groupId' => $groupId,
            'schoolId' => $schoolId
        ]);
        
        $this->link->set($link);

        $this->setOutput($link);
        return $this;
    }
}