<?php
namespace src\module\login\repository;

use tools\infrastructure\Repository;
use tools\infrastructure\Collector;
use tools\infrastructure\ICredential;
use tools\module\login\factory\CredentialFactory;

class CredentialRepository extends Repository{
    protected CredentialFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new CredentialFactory();
    }
    
    public function edit(ICredential $creds):void{
        $this->update('credential')        
            ->column('expire', $creds->expire())
            ->column('refreshToken', $creds->refreshToken())
            ->where()->eq('id', $this->uuid($creds->id()));
        $this->execute();
    }
    
    public function listCredentials(array $where):Collector{
        $this->select('credential');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}