<?php
namespace src\module\user\logic;

use tools\infrastructure\Collector;
use src\module\user\repository\UserRepository;

class ListUsers extends BindSchoolDependencies{
    protected UserRepository $repo;

    public function __construct(){
        parent::__construct();
        $this->repo = new UserRepository();
    }

    public function users():Collector{
        $collector = $this->repo->listUsers([
            'hide' => false
        ]);
        return $this->bindDependencies($collector);
    }

    public function usersByIdArray(array $idArray):Collector{
        if(empty($idArray)){
            return new Collector();
        }
        $collector = $this->repo->listUsers([
            'id' => $idArray,
            'hide' => false
        ]);
        return $this->bindDependencies($collector);
    }

    public function byName(string $name):Collector{
        if(empty($name)){
            return new Collector();
        }
        $firstNameCollector = $this->repo->listUsers([
            'firstName' => $name,
            'hide' => false
        ]);
        $lastNameCollector = (new $this->repo)->listUsers([
            'lastName' => $name,
            'hide' => false
        ]);
        foreach($firstNameCollector->list() as $firstName){
            $found = false;
            foreach($lastNameCollector->list() as $lastName){
                if($firstName->id()->toString() === $lastName->id()->toString()){
                    $found = true;
                    break;
                }
            }
            if(!$found){
                $lastNameCollector->add($firstName);
            }
        }
        return $this->bindDependencies($lastNameCollector);
    }
}