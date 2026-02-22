<?php
namespace src\module\user\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Address implements IObjects{
    protected Id $id;
    protected string $country;
    protected string $state;
    protected string $address;
    protected string $apt;
    protected string $zip;

    public function __construct(){
        $this->id = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function country():string{
        return $this->country;
    }

    public function state():string{
        return $this->state;
    }

    public function address():string{
        return $this->address;
    }

    public function apt():string{
        return $this->apt;
    }

    public function zip():string{
        return $this->zip;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setCountry(string $country):void{
        $this->country = $country;
    }

    public function setState(string $state):void{
        $this->state = $state;
    }

    public function setAddress(string $address):void{
        $this->address = $address;
    }

    public function setApt(string $apt):void{
        $this->apt = $apt;
    }
    
    public function setZip(string $zip):void{
        $this->zip = $zip;
    }
}