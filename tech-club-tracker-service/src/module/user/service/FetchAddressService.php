<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\FetchAddress;

class FetchAddressService extends Service{
    protected FetchAddress $address;

    public function __construct(){
        parent::__construct();
        $this->address = new FetchAddress();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Address not found.');

        $collector = $this->address->address(new Id($id));
        $this->setOutput($collector);
        return $this;
    }
}