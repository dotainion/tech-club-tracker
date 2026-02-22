<?php
namespace src\module\user\logic;

use src\module\user\objects\Address;
use src\module\user\repository\AddressRepository;

class SetAddress{
    protected AddressRepository $repo;

    public function __construct(){
        $this->repo = new AddressRepository();
    }

    public function setAddress(Address $address):void{
        $collector = (new FetchAddress())->address($address->id());
        if($collector->hasItem()){
            $this->repo->edit($address);
            return;
        }
        $this->repo->create($address);
    }
}