<?php
namespace src\module\school\logic;

use src\module\school\objects\SchoolLink;
use src\module\school\repository\SchoolLinkRepository;

class SetSchoolLink{

    protected SchoolLinkRepository $repo;

    public function __construct() {
        $this->repo = new SchoolLinkRepository();
    }

    public function set(SchoolLink $link):void{
        if($link->hide()){
            $this->repo->deleteSchoolLink($link);
            return;
        }
        $collector = $this->repo->listSchoolLink([
            'schoolId' => $link->schoolId(),
            'userId' => $link->userId()
        ]);
        if($collector->hasItem()){
            return;
        }
        $this->repo->create($link);
    }
}