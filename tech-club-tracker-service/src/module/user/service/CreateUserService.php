<?php
namespace src\module\user\service;

use permission\infrastructure\RoleAttributes;
use tools\infrastructure\Assert;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\service\CreateCredentialService;
use src\module\user\factory\AddressFactory;
use src\module\user\factory\UserFactory;
use src\module\user\logic\CreateUser;
use src\module\user\logic\SetAddress;

class CreateUserService extends Service{
    protected CreateUser $user;
    protected UserFactory $factory;
    protected SetAddress $address;
    protected AddressFactory $addressFactory;

    public function __construct(){
        parent::__construct(false);
        $this->user = new CreateUser();
        $this->factory = new UserFactory();
        $this->address = new SetAddress();
        $this->addressFactory = new AddressFactory();
    }
    
    public function process(
        $userId,
        $firstName,
        $lastName,
        $email,
        $phoneNumber,
        $gender,
        $password,
        $confirmPassword,
        $role,
        $read,
        $write,
        $edit,
        $delete
    ){
        Assert::validPassword($password);
        Assert::validPassword($confirmPassword);
        Assert::validPasswordMatch($password, $confirmPassword);
        Assert::inArray($role, RoleAttributes::all(), 'Invalid system role.');
        
        $user = $this->factory->mapResult([
            'id' => (new Id())->isValid($userId) ? $userId : (new Id())->new()->toString(),
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'phoneNumber' => $phoneNumber,
            'foreignId' => null,
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false,
            'gender' => $gender,
            'addressId' => (new Id())->new()->toString(),
        ]);

        $address = $this->addressFactory->mapResult([
            'id' => $user->addressId()->toString()
        ]);

        $this->address->setAddress($address);
        
        $this->user->create($user);

        (new SetRoleService(false))->process($user->id()->toString(), $role, $read, $write, $edit, $delete);
        (new CreateCredentialService(false))->process($user->id()->toString(), $password);

        $this->setOutput($user);
        return $this;
    }
}