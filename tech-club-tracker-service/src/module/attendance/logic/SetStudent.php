<?php
namespace src\module\attendance\logic;

use src\module\attendance\objects\Student;
use src\module\attendance\repository\StudentRepository;

class SetStudent{
    protected StudentRepository $repo;

    public function __construct(){
        $this->repo = new StudentRepository();
    }

    public function set(Student $student):void{
        if($student->hide()){
            $this->repo->deleteStudent($student);
            return;
        }
        $collector = $this->repo->listStudents([
            'studentId' => $student->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($student);
            return;
        }
        $this->repo->create($student);
    }
}