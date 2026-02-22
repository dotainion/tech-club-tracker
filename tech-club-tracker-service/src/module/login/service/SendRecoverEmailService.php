<?php
namespace src\module\login\service;

use src\module\user\logic\FetchUser;
use tools\infrastructure\Email;
use src\infrastructure\Service;
use tools\SecurityTools;

class SendRecoverEmailService extends Service{
    protected SecurityTools $secure;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
        $this->user = new FetchUser();
    }
    
    public function process($email){
        $collector = $this->user->userByEmail(new Email($email));
        $collector->assertHasItem('User not found.');
        $service = $this->secure->sendEmailRecovery($email, $collector->first()->id()->toString());
        
        return $this->mergeOutput($service);
    }
}