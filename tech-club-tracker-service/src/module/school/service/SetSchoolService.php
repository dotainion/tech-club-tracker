<?php
namespace src\module\school\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\school\factory\SchoolFactory;
use src\module\school\logic\SetSchool;
use src\module\school\service\ListSchoolService;

class SetSchoolService extends Service{
    protected SchoolFactory $factory;
    protected SetSchool $school;
    protected ListSchoolService $list;
    protected SetSchoolLinkService $link;

    public function __construct(){
        parent::__construct();
        $this->factory = new SchoolFactory();
        $this->school = new SetSchool();
        $this->list = new ListSchoolService();
        $this->link = new SetSchoolLinkService();
    }
    
    public function process($schoolId, $name,  $principal, $status, $email, $contact, $hide){
        Assert::stringNotEmpty($name, 'A school name must be provided.');
        Assert::stringNotEmpty($status, 'Invalid status.');
        Assert::inArray($status, ['Active', 'Inactive'], 'Invalid status');

        $schoolId = (new Id())->isValid($schoolId) ? new Id($schoolId) : (new Id())->new();

        $school = $this->factory->mapResult([
            'schoolId' => $schoolId->toString(),
            'name' => $name,
            'principal' => $principal,
            'status' => $status,
            'email' => $email,
            'contact' => $contact,
            'hide' => $hide
        ]);

        $this->school->set($school);
        $this->link->process(
            $school->id()->toString(),
            $this->user()->id()->toString(),
            $hide
        );
        
        $this->setOutput($school);
        return $this->list->process(null, $school->id()->toString(), null);
    }
}