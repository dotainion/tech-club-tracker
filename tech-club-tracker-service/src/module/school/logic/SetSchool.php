<?php
namespace src\module\school\logic;

use src\module\school\objects\School;
use src\module\school\repository\SchoolRepository;

class SetSchool{

    protected SchoolRepository $repo;

    public function __construct() {
        $this->repo =new SchoolRepository();
    }

    public function set(School $school):void{
        $collector = $this->repo->listSchool([
            'name' => $school->name()
        ]);
        $collector->remove($school);
        $collector->assertItemNotExist('School name already exist.');
        if($school->hide()){
            $this->repo->deleteSchool($school);
            return;
        }
        $collector = $this->repo->listSchool([
            'schoolId' => $school->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($school);
            return;
        }
        $this->repo->create($school);
    }
}