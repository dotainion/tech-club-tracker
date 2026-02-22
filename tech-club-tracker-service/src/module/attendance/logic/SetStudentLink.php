<?php
namespace src\module\attendance\logic;

use src\module\attendance\objects\StudentLink;
use src\module\attendance\repository\StudentLinkRepository;

class SetStudentLink{
    protected StudentLinkRepository $repo;

    public function __construct(){
        $this->repo = new StudentLinkRepository();
    }

    public function set(StudentLink $link):void{
        if($link->hide()){
            $this->repo->deleteStudentLink($link);
            return;
        }
        $collector = $this->repo->listStudentLink([
            'groupId' => $link->groupId(),
            'schoolId' => $link->schoolId(),
            'studentId' => $link->studentId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->create($link);
    }
}