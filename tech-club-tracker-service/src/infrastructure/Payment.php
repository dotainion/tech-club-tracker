<?php
namespace src\infrastructure;

use InvalidArgumentException;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;
use tools\infrastructure\IUser;

class Payment implements IObjects{
    protected Id $id;
    protected Id $susuId;
    protected Id $memberId;
    protected DateHelper $date;
    protected ?IUser $user=null;
    protected string $description;
    protected string $paymentIntentId;
    protected string $type;

    public function __construct(){
        $this->id = new Id();
        $this->susuId = new Id();
        $this->memberId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function user():?IUser{
        return $this->user;
    }

    public function memberId():IId{
        return $this->memberId;
    }

    public function susuId():IId{
        return $this->susuId;
    }

    public function date():DateHelper{
        return $this->date;
    }

    public function description():string{
        return $this->description;
    }

    public function paymentIntentId():string{
        return $this->paymentIntentId;
    }

    public function type():string{
        return $this->type;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setMemberId(string $memberId):void{
        $this->memberId->set($memberId);
    }

    public function setSusuId(string $susuId):void{
        $this->susuId->set($susuId);
    }
    
    public function setDate(string $date):void{
        $this->date = new DateHelper($date);
    }

    public function setUser(IUser $user):void{
        $this->user = $user;
    }

    public function setDescription(string $description):void{
        $this->description = $description;
    }

    public function setPaymentIntentId(string $paymentIntentId):void{
        $this->paymentIntentId = $paymentIntentId;
    }

    public function setType(string $type):void{
        if(!in_array($type, ['Card', 'Cash'])){
            throw new InvalidArgumentException('Invalid payment type.');
        }
        $this->type = $type;
    }
}