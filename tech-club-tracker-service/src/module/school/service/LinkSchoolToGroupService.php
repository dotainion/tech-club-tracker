<?php
namespace src\module\school\service;

use src\infrastructure\Service;
use src\module\school\factory\GroupLinkSchoolFactory;
use src\module\school\logic\LinkGroupToSchool;
use tools\infrastructure\Assert;

class LinkSchoolToGroupService extends Service{
    protected LinkGroupToSchool $link;
    protected GroupLinkSchoolFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->link = new LinkGroupToSchool();
        $this->factory = new GroupLinkSchoolFactory();
    }
    
    public function process($schoolId, $groupId, $hide){
        Assert::validUuid($schoolId, 'School not found.');
        Assert::validUuid($groupId, 'Group not found.');

        $link = $this->factory->mapResult([
            'schoolId' => $schoolId,
            'groupId' => $groupId,
            'hide' => $hide
        ]);

        $this->link->set($link);

        $this->setOutput($link);
        return $this;
    }  
}