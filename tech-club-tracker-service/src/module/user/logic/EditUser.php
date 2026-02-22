<?php
namespace src\module\user\logic;

use InvalidArgumentException;
use src\module\user\repository\UserRepository;
use src\module\user\objects\User;

class EditUser{
    protected UserRepository $repo;

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function assertUniqueEmail(User $user):bool{
        $collector = $this->repo->listUsers(['email' => $user->email()]);
        if($collector->hasItem() && $collector->first()->id()->toString() !== $user->id()->toString()){
            throw new InvalidArgumentException('Email ('.$user->email().') already exist.');
        }
        return true;
    }

    public function edit(User $user):void{
        $this->assertUniqueEmail($user);
        $this->repo->edit($user);
    }
}