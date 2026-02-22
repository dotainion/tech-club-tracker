<?php
namespace src\module\school\logic;

use src\module\school\objects\GroupLinkSchool;
use src\module\school\repository\GroupLinkSchoolRepository;

class LinkGroupToSchool{

    protected GroupLinkSchoolRepository $repo;

    public function __construct() {
        $this->repo = new GroupLinkSchoolRepository();
    }

    public function set(GroupLinkSchool $link):void{
        $collector = $this->repo->listLink([
            'schoolId' => $link->schoolId(),
            'groupId' => $link->groupId()
        ]);
        if($link->hide()){
            $this->repo->deleteLink($link);
            return;
        }
        if($collector->hasItem()){
            return;
        }
        $this->repo->create($link);
    }
}