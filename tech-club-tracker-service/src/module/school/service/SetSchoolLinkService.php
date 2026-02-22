<?php
namespace src\module\school\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\school\factory\SchoolLinkFactory;
use src\module\school\logic\SetSchoolLink;

class SetSchoolLinkService extends Service{
    protected SetSchoolLink $school;
    protected SchoolLinkFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->school = new SetSchoolLink();
        $this->factory = new SchoolLinkFactory();
    }
    
    public function process($schoolId, $userId, $hide){
        Assert::validUuid($schoolId, 'School not found.');
        Assert::validUuid($userId, 'User not found.');

        $link = $this->factory->mapResult([
            'schoolId' => $schoolId,
            'userId' => $userId,
            'hide' => $hide
        ]);

        $this->school->set($link);

        $this->setOutput($link);
        return $this;
    }  
}