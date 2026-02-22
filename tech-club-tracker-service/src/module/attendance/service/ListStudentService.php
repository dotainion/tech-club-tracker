<?php
namespace src\module\attendance\service;

use InvalidArgumentException;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\attendance\logic\ListStudents;

class ListStudentService extends Service{
    protected ListStudents $students;

    public function __construct(){
        parent::__construct(false);
        $this->students = new ListStudents();
    }
    
    public function process($schoolId, $studentId, $date){
        //date here is not being use but its to indicate that its being use in the 
        //logic to pull attendance by date .. request->get('date')
        $schoolId = (new Id())->isValid($schoolId) ? new Id($schoolId) : null;
        $studentId = (new Id())->isValid($studentId) ? new Id($studentId) : null;

        if($schoolId && $studentId){
            throw new InvalidArgumentException('Using both groupId and studentId is strickly not allow here.');
        }

        if($schoolId){
            $collector = $this->students->bySchoolId($schoolId);
        }elseif($studentId){
            $collector = $this->students->byStudentId($studentId);
        }else{
            $collector = $this->students->list();
        }
        
        $this->setOutput($collector);
        return $this;
    }
}