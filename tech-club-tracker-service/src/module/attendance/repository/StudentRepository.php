<?php
namespace src\module\attendance\repository;

use src\infrastructure\Repository;
use src\module\attendance\factory\StudentFactory;
use src\module\attendance\objects\Student;
use tools\infrastructure\Collector;

class StudentRepository extends Repository{
    protected StudentFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new StudentFactory();
    }
    
    public function create(Student $student):void{
        $this->insert('student')        
            ->column('studentId', $this->uuid($student->id()))
            ->column('firstName', $student->firstName())
            ->column('lastName', $student->lastName())
            ->column('email', $student->email())
            ->column('contact', $student->contact())
            ->column('gender', $student->gender())
            ->column('dob', $student->dob())
            ->column('grade', $student->grade())
            ->column('status', $student->status());
        $this->execute();
    }
    
    public function edit(Student $student):void{
        $this->update('student')  
            ->column('firstName', $student->firstName())
            ->column('lastName', $student->lastName())
            ->column('email', $student->email())
            ->column('contact', $student->contact())
            ->column('gender', $student->gender())
            ->column('dob', $student->dob())
            ->column('grade', $student->grade())
            ->column('status', $student->status())
            ->where()->eq('studentId', $this->uuid($student->id()));
        $this->execute();
    }
    
    public function deleteStudent(Student $student):void{
        $this->delete('student')
            ->where()->eq('studentId', $this->uuid($student->id()));
        $this->execute();
    }
    
    public function listStudents(array $where=[]):Collector{
        $this->select('student');

        if(isset($where['schoolId'])){
            $this->join()->inner('studentLink', 'studentId', 'student', 'studentId');
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']), 'studentLink');
        }
        if(isset($where['groupId'])){
            $this->join()->inner('studentLink', 'studentId', 'student', 'studentId');
            $this->where()->eq('groupId', $this->uuid($where['groupId']), 'studentLink');
        }
        if(isset($where['studentId'])){
            $this->where()->eq('studentId', $this->uuid($where['studentId']));
        }
        if(isset($where['firstName'])){
            $this->where()->like('firstName', $where['firstName']);
        }
        if(isset($where['lastName'])){
            $this->where()->like('lastName', $where['lastName']);
        }
        if(isset($where['email'])){
            $this->where()->eq('email', $where['email']);
        }
        if(isset($where['contact'])){
            $this->where()->eq('contact', $where['contact']);
        }
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('date', $where['from'], $where['to']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}