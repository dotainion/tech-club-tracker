<?php
namespace src\module\user\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\user\repository\AddressRepository;

class FetchAddress{
    protected AddressRepository $repo;

    public function __construct(){
        $this->repo = new AddressRepository();
    }

    public function address(Id $id):Collector{
        return $this->repo->listAddress([
            'id' => $id,
        ]);
    }
}