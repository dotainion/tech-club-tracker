<?php
namespace src\module\user\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\user\objects\Address;

class AddressFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Address{
        $address = new Address();
        $address->setId($this->uuid($record['id']));
        $address->setCountry($record['country'] ?? '');
        $address->setState($record['state'] ?? '');
        $address->setAddress($record['address'] ?? '');
        $address->setApt($record['apt'] ?? '');
        $address->setZip($record['zip'] ?? '');
        return $address;
    }
}