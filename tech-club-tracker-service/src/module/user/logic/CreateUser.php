<?php
namespace src\module\user\logic;

use InvalidArgumentException;
use src\module\user\repository\UserRepository;
use src\module\user\objects\User;

class CreateUser{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function assertUniqueEmail(string $email):bool{
        $collector = $this->repo->listUsers(['email' => $email]);
        if($collector->hasItem()){
            throw new InvalidArgumentException('Email ('.$email.') already exist.');
        }
        return true;
    }

    public function create(User $user):void{
        $this->assertUniqueEmail($user->email());
        $this->repo->create($user);
    }
}