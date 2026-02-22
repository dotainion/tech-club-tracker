<?php
namespace src\module\user\factory;

use permission\role\factory\RoleFactory;
use src\module\user\objects\User;
use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use tools\infrastructure\IFactory;
use tools\infrastructure\IUser;

class UserFactory extends Collector implements IFactory{
    use Factory;

    protected RoleFactory $factory;

    public function __construct(){
        $this->factory = new RoleFactory();
    }

    public function mapResult($record):IUser{
        $user = new User();
        $user->setId($this->uuid($record['id']));
        $user->setFirstName($record['firstName']);
        $user->setLastName($record['lastName']);
        $user->setEmail($record['email']);
        $user->setPhoneNumber((string)$record['phoneNumber']);
        isset($record['date']) && $user->setDate($record['date']);
        $user->setForeignId($record['foreignId'] ?? null);
        $user->setPicture($record['picture'] ?? null);
        $user->setHide($record['hide']);
        $user->setGender($record['gender'] ?? '');
        $this->isValidUUid($record['addressId'] ?? null) && $user->setAddressId($this->uuid($record['addressId']));
        isset($record['userId']) && $user->setRole($this->factory->mapResult($record));
        return $user;
    }
}