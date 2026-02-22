<?php
namespace src\schema;

use Exception;
use tools\schema\Schema as ToolsSchema;

class Schema extends ToolsSchema{

    public function user(){
        $this->sql->create('user')
            ->column('id')->bindary()
            ->column('firstName')->string()
            ->column('lastName')->string()
            ->column('email')->string()
            ->column('hide')->bool()
            ->column('date')->timestamp()
            ->column('gender')->string()
            ->column('phoneNumber')->string()
            ->column('addressId')->bindary()
            ->column('foreignId')->string();
        return $this->sql->execute();
    }

    public function address(){
        $this->sql->create('address')
            ->column('id')->bindary()
            ->column('country')->string()
            ->column('state')->string()
            ->column('address')->paragraph()
            ->column('apt')->string()
            ->column('zip')->string();
        return $this->sql->execute();
    }

    public function credential(){
        $this->sql->create('credential')
            ->column('id')->bindary()
            ->column('expire')->timestamp()
            ->column('password')->string()
            ->column('token')->string()
            ->column('refreshToken')->string();
        return $this->sql->execute();
    }
    
    public function school(){
        $this->sql->create('school')
            ->column('schoolId')->bindary()
            ->column('name')->string()
            ->column('principal')->string()
            ->column('status')->string()
            ->column('email')->string()
            ->column('contact')->string();
        return $this->sql->execute();
    }
    
    public function schoolLink(){
        $this->sql->create('schoolLink')
            ->column('schoolId')->bindary()
            ->column('userId')->bindary();
        return $this->sql->execute();
    }

    public function groupLinkSchool(){
        $this->sql->create('groupLinkSchool')
            ->column('schoolId')->bindary()
            ->column('groupId')->bindary();
        return $this->sql->execute();
    }
    
    public function group(){
        $this->sql->create('group')
            ->column('groupId')->bindary()
            ->column('name')->string()
            ->column('description')->paragraph();
        return $this->sql->execute();
    }

    public function student(){
        $this->sql->create('student')
            ->column('studentId')->bindary()
            ->column('firstName')->string()
            ->column('lastName')->string()
            ->column('email')->string()
            ->column('contact')->string()
            ->column('gender')->string()
            ->column('dob')->timestamp(false, true)
            ->column('grade')->string()
            ->column('status')->string();
        return $this->sql->execute();
    }

    public function studentLink(){
        $this->sql->create('studentLink')
            ->column('studentId')->bindary()
            ->column('schoolId')->bindary()
            ->column('groupId')->bindary();
        return $this->sql->execute();
    }

    public function attendance(){
        $this->sql->create('attendance')
            ->column('attendanceId')->bindary()
            ->column('studentId')->bindary()
            ->column('groupId')->bindary()
            ->column('date')->timestamp();
        return $this->sql->execute();
    }

    public function report(){
        $this->sql->create('report')
            ->column('reportId')->bindary()
            ->column('schoolId')->bindary()
            ->column('facilitatorId')->bindary()
            ->column('date')->timestamp()
            ->column('term')->string()
            ->column('sessions')->string()
            ->column('challenges')->string()
            ->column('successes')->string()
            ->column('hide')->bool()
            ->column('published')->bool();
        return $this->sql->execute();
    }

    public function summary(){
        $this->sql->create('summary')
            ->column('reportId')->bindary()
            ->column('beginner')->string()
            ->column('intermediate')->string()
            ->column('advanced')->string();
        return $this->sql->execute();
    }

    public function focusArea(){
        $this->sql->create('focusArea')
            ->column('focusAreaId')->bindary()
            ->column('reportId')->bindary()
            ->column('groupId')->bindary()
            ->column('topic')->string()
            ->column('date')->timestamp()
            ->column('lessonDetail')->book()
            ->column('engagement')->book()
            ->column('resources')->book();
        return $this->sql->execute();
    }

    public function settings(){
        $this->sql->create('settings')
            ->column('userId')->bindary()
            ->column('isActive')->bool()
            ->column('checkAttendance')->bool()
            ->column('manageSchoolGroupStudent')->bool()
            ->column('generateReports')->bool()
            ->column('isAdmin')->bool()
            ->column('manageUsers')->bool()
            ->column('viewReports')->bool()
            ->column('sendNotifications')->bool();
        return $this->sql->execute();
    }
    
    public function run(){
        foreach(get_class_methods($this) as $method){
            if($method === '__construct' || $method === 'run') continue;
            if (!is_callable([$this, $method])) {
                throw new Exception($method.' is not callable');
            }
            $this->$method()->reset();
        }
    }
}
