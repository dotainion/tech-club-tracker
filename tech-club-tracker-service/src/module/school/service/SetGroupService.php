<?php
namespace src\module\school\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\school\factory\GroupFactory;
use src\module\school\logic\SetGroup;

class SetGroupService extends Service{
    protected GroupFactory $factory;
    protected SetGroup $report;

    public function __construct($checkAuth=true){
        parent::__construct($checkAuth);
        $this->factory = new GroupFactory();
        $this->report = new SetGroup();
    }
    
    public function process($groupId, $name, $description, $hide, $forceDelete){
        //forceDelete is being use in the logic to fource delete if related records exist.
        Assert::stringNotEmpty($name, 'Group name must be provided.');

        $groupId = (new Id())->isValid($groupId) ? new Id($groupId) : (new Id())->new();

        $group = $this->factory->mapResult([
            'groupId' => $groupId->toString(),
            'name' => $name,
            'description' => $description,
            'hide' => $hide
        ]);

        $this->report->set($group);
        
        $this->setOutput($group);
        return $this;
    }
}