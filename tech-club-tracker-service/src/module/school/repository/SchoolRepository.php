<?php
namespace src\module\school\repository;

use src\infrastructure\Repository;
use src\module\school\factory\SchoolFactory;
use src\module\school\objects\School;
use tools\infrastructure\Collector;

class SchoolRepository extends Repository{
    protected SchoolFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new SchoolFactory();
    }
    
    public function create(School $school):void{
        $this->insert('school')
            ->column('schoolId', $this->uuid($school->id()))
            ->column('name', $school->name())
            ->column('principal', $school->principal())
            ->column('status', $school->status())
            ->column('email', $school->email())
            ->column('contact', $school->contact());
        $this->execute();
    }
    
    public function edit(School $school):void{
        $this->update('school')
            ->column('name', $school->name())
            ->column('principal', $school->principal())
            ->column('status', $school->status())
            ->column('email', $school->email())
            ->column('contact', $school->contact())
            ->where()->eq('schoolId', $this->uuid($school->id()));
        $this->execute();
    }
    
    public function deleteSchool(School $school):void{
        $this->delete('school')
            ->where()->eq('schoolId', $this->uuid($school->id()));
        $this->execute();
    }

    public function listSchool(array $where = []):Collector{
        $this->select('school');

        if(isset($where['userId'])){
            $this->join()->inner('schoolLink', 'schoolId', 'school', 'schoolId');
            $this->where()->eq('userId', $this->uuid($where['userId']), 'schoolLink');
        }
        if(isset($where['name'])){
            $this->where()->eq('name', $where['name']);
        }
        if(isset($where['schoolId'])){
            $this->where()->eq('schoolId', $this->uuid($where['schoolId']));
        }
        if(isset($where['email'])){
            $this->where()->eq('email', $where['email']);
        }
        if(isset($where['contact'])){
            $this->where()->eq('contact', $where['contact']);
        }
        if(isset($where['principal'])){
            $this->where()->like('principal', $where['principal']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}