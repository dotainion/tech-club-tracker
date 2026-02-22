<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use tools\SecurityTools;

class FetchRoleService extends Service{
    protected SecurityTools $secure;

    public function __construct(){
        parent::__construct();
        $this->secure = new SecurityTools();
    }
    
    public function process($userId){
        Assert::validUuid($userId, 'User not found.');

        $service = $this->secure->listRoles($userId);
        $this->mergeOutput($service);
        return $this;
    }
}