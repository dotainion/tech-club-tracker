<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use tools\SecurityTools;

class SetRoleService extends Service{
    protected SecurityTools $secure;

    public function __construct(bool $authCheck=true){
        parent::__construct($authCheck);
        $this->secure = new SecurityTools();
    }
    
    public function process($userId, $role, $read,  $write,  $edit,  $delete){
        Assert::validUuid($userId, 'User not found.');

        $service = $this->secure->setRole($userId, $role, $read, $write, $edit, $delete);
        $this->mergeOutput($service);
        return $this;
    }
}