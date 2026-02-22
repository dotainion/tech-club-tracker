<?php
namespace src\module\user\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Email;
use tools\infrastructure\Id;
use src\module\user\repository\UserRepository;

class FetchUser extends BindSchoolDependencies{
    protected UserRepository $repo;

    public function __construct(){
        parent::__construct();
        $this->repo = new UserRepository();
    }

    public function user(Id $id):Collector{
        $collector = $this->repo->listUsers(['id' => $id, 'hide' => false]);
        return $this->bindDependencies($collector);
    }

    public function userByForeignId(string $id):Collector{
        $collector = $this->repo->listUsers(['foreignId' => $id, 'hide' => false]);
        return $this->bindDependencies($collector);
    }

    public function userByEmail(Email $email):Collector{
        $collector = $this->repo->listUsers(['email' => $email, 'hide' => false]);
        return $this->bindDependencies($collector);
    }
}