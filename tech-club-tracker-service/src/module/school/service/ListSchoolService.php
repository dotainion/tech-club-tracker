<?php
namespace src\module\school\service;

use InvalidArgumentException;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\school\logic\ListSchool;
use tools\infrastructure\Assert;

class ListSchoolService extends Service{
    protected ListSchool $school;

    public function __construct(){
        parent::__construct();
        $this->school = new ListSchool();
    }
    
    public function process($userId, $schoolId, $date){
        //date is here as information.. its use in the atendane logic to pull attendance by date
        $userId && Assert::validUuid($userId, 'Invalid user identification.');
        $schoolId && Assert::validUuid($schoolId, 'Invalid school identification.');

        if($userId && $schoolId){
            throw new InvalidArgumentException('ListSchoolService arguments can only be either userId or schoolId but not both.');
        }

        $userId = (new Id())->isValid($userId) ? new Id($userId) : null;
        $schoolId = (new Id())->isValid($schoolId) ? new Id($schoolId) : null;

        if(!is_null($schoolId)){
            $collector = $this->school->byId($schoolId);
        }elseif(!is_null($userId)){
            $collector = $this->school->byUserId($userId);
        }else{
            $collector = $this->school->list();
        }
            
        $collector->assertHasItem('No available school.');

        $this->setOutput($collector);
        return $this;
    }  
}