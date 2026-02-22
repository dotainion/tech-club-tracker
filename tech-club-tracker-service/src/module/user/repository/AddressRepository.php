<?php
namespace src\module\user\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\user\factory\AddressFactory;
use src\module\user\objects\Address;

class AddressRepository extends Repository{
    protected AddressFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new AddressFactory();
    }
    
    public function create(Address $address):void{
        $this->insert('address')        
            ->column('id', $this->uuid($address->id()))
            ->column('country', $address->country())
            ->column('state', $address->state())
            ->column('address', $address->address())
            ->column('apt', $address->apt())
            ->column('zip', $address->zip());
        $this->execute();
    }
    
    public function edit(Address $address):void{
        $this->update('address')
            ->column('country', $address->country())
            ->column('state', $address->state())
            ->column('address', $address->address())
            ->column('apt', $address->apt())
            ->column('zip', $address->zip())
            ->where()->eq('id', $this->uuid($address->id()));
        $this->execute();
    }
    
    public function listAddress(array $where=[]):Collector{
        $this->select('address');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}