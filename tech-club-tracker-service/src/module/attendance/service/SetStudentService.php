<?php
namespace src\module\attendance\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\attendance\factory\StudentFactory;
use src\module\attendance\factory\StudentLinkFactory;
use src\module\attendance\logic\ListStudents;
use src\module\attendance\logic\SetStudent;
use src\module\attendance\logic\SetStudentLink;
use tools\infrastructure\DateHelper;

class SetStudentService extends Service{
    protected SetStudentLink $link;
    protected SetStudent $student;
    protected StudentFactory $factory;
    protected StudentLinkFactory $linkFactory;
    protected ListStudents $students;

    public function __construct(){
        parent::__construct(false);
        $this->link = new SetStudentLink();
        $this->student = new SetStudent();
        $this->factory = new StudentFactory();
        $this->linkFactory = new StudentLinkFactory();
        $this->students = new ListStudents();
    }
    
    public function process(
        $studentId,
        $schoolId,
        $firstName,
        $lastName,
        $email,
        $contact,
        $gender,
        $dob,
        $grade,
        $status,
        $hide,
        $studentLinks
    ){
        Assert::validUuid($schoolId, 'School not found.');
        Assert::stringNotEmpty($firstName, 'First name is required.');
        Assert::stringNotEmpty($lastName, 'Last name is required.');

        $studentId = (new Id())->isValid($studentId) ? new Id($studentId) : (new Id())->new();

        $student = $this->factory->mapResult([
            'studentId' => $studentId->toString(),
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'contact' => $contact,
            'gender' => $gender,
            'dob' => (new DateHelper())->isValid($dob) ? $dob : null,
            'grade' => $grade,
            'status' => $status,
            'hide' => $hide
        ]);
        
        foreach($studentLinks ?? [] as $link){
            Assert::validUuid($link['groupId'], 'Group not found.');

            $link = $this->linkFactory->mapResult([
                'studentId' => $studentId->toString(),
                'schoolId' => $schoolId,
                'groupId' => $link['groupId'],
                'hide' => $link['hide'] ?? false
            ]);
            
            $this->link->set($link);
        }

        $this->student->set($student);

        if($student->hide()){
            $this->setOutput($student);
            return $this;
        }


        $collector = $this->students->byStudentId($student->id());
        $this->setOutput($collector);
        return $this;
    }
}