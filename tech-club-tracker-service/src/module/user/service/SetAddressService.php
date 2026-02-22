<?php
namespace src\module\user\service;

use tools\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\user\factory\AddressFactory;
use src\module\user\logic\SetAddress;

class SetAddressService extends Service{
    protected AddressFactory $factory;
    protected SetAddress $address;

    public function __construct(){
        parent::__construct();
        $this->factory = new AddressFactory();
        $this->address = new SetAddress();
    }
    
    public function process($id, $country, $state, $address, $apt, $zip){
        Assert::validUuid($id, 'Address not found.');

        $addresss = $this->factory->mapResult([
            'id' => $id,
            'country' => $country, 
            'state' => $state, 
            'address' => $address, 
            'apt' => $apt, 
            'zip' => $zip
        ]);

        $this->address->setAddress($addresss);

        $this->setOutput($addresss);
        return $this;
    }
}