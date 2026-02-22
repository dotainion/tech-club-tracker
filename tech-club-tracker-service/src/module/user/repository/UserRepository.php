<?php
namespace src\module\user\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use src\module\user\factory\UserFactory;
use src\module\user\objects\User;

class UserRepository extends Repository{
    protected UserFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new UserFactory();
    }
    
    public function create(User $user):void{
        $this->insert('user')        
            ->column('id', $this->uuid($user->id()))
            ->column('firstName', $user->firstName())
            ->column('lastName', $user->lastName())
            ->column('email', $user->email())
            ->column('hide', (int)$user->hide())
            ->column('date', $user->date())
            ->column('gender', $user->gender())
            ->column('phoneNumber', $user->phoneNumber())
            ->column('addressId', $this->uuid($user->addressId()))
            ->column('foreignId', $user->foreignId());
        $this->execute();
    }
    
    public function edit(User $user):void{
        $this->update('user')       
            ->column('firstName', $user->firstName())
            ->column('lastName', $user->lastName())
            ->column('email', $user->email())
            ->column('hide', (int)$user->hide())
            //->column('date', $user->date())
            ->column('gender', $user->gender())
            ->column('phoneNumber', $user->phoneNumber())
            ->column('foreignId', $user->foreignId())
            //->column('addressId', $this->uuid($user->addressId()))
            ->where()->eq('id', $this->uuid($user->id()));
        $this->execute();
    }
    
    public function listUsers(array $where=[]):Collector{
        $this->select('user')
            ->join()->inner('role', 'userId', 'user', 'id')
            ->cursor()->join()->inner('rolePermission', 'userId', 'user', 'id');
            
        if(isset($where['from']) && isset($where['to'])){
            $this->where()->between('date', $where['from'], $where['to']);
        }
        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['foreignId'])){
            $this->where()->eq('foreignId', $where['foreignId']);
        }
        if(isset($where['email'])){
            $this->where()->eq('email', $where['email']);
        }
        if(isset($where['hide'])){
            $this->where()->eq('hide', (int)$where['hide']);
        }
        if(isset($where['date'])){
            $this->where()->eq('date', $where['date']);
        }
        if(isset($where['gender'])){
            $this->where()->eq('gender', $where['gender']);
        }
        if(isset($where['phoneNumber'])){
            $this->where()->eq('phoneNumber', $where['phoneNumber']);
        }
        if(isset($where['firstName'])){
            $this->where()->like('firstName', $where['firstName']);
        }
        if(isset($where['lastName'])){
            $this->where()->like('lastName', $where['lastName']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}