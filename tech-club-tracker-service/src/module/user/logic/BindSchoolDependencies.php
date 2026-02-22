<?php
namespace src\module\user\logic;

use src\module\school\logic\ListSchool;
use tools\infrastructure\Collector;

class BindSchoolDependencies{

    protected ListSchool $schools;

    public function __construct() {
        $this->schools = new ListSchool();
    }

    public function bindDependencies(Collector &$users):Collector{
        $users->assertHasItem('No school.');
        $schools = $this->schools->byUserIdArray($users->idArray());
        foreach($users->list() as $user){
            foreach($schools->list() as $school){
                if($school->schoolLinks()->includes($user->id()->toString(), 'userId')){
                    $user->schools()->add($school);
                }
            }
        }
        return $users;
    }
}