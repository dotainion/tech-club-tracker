<?php
namespace src\module\settings\objects;

use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Settings implements IObjects{
    protected Id $id;
    protected bool $isActive;
    protected bool $checkAttendance;
    protected bool $manageSchoolGroupStudent;
    protected bool $generateReports;
    protected bool $isAdmin;
    protected bool $manageUsers;
    protected bool $viewReports;
    protected bool $sendNotifications;

    public function __construct(
        string $userId,
        bool $isActive,
        bool $checkAttendance,
        bool $manageSchoolGroupStudent,
        bool $generateReports,
        bool $isAdmin,
        bool $manageUsers,
        bool $viewReports,
        bool $sendNotifications
    ){
        $this->id = new Id($userId);
        $this->isActive = $isActive;
        $this->checkAttendance = $checkAttendance;
        $this->manageSchoolGroupStudent = $manageSchoolGroupStudent;
        $this->generateReports = $generateReports;
        $this->isAdmin = $isAdmin;
        $this->manageUsers = $manageUsers;
        $this->viewReports = $viewReports;
        $this->sendNotifications = $sendNotifications;
    }

    public function id():IId{
        return $this->id;
    }

    public function userId():IId{
        return $this->id();
    }

    public function isActive():bool{
        return $this->isActive;
    }

    public function checkAttendance():bool{
        return $this->checkAttendance;
    }

    public function manageSchoolGroupStudent():bool{
        return $this->manageSchoolGroupStudent;
    }

    public function generateReports():bool{
        return $this->generateReports;
    }

    public function isAdmin():bool{
        return $this->isAdmin;
    }

    public function manageUsers():bool{
        return $this->manageUsers;
    }

    public function viewReports():bool{
        return $this->viewReports;
    }

    public function sendNotifications():bool{
        return $this->sendNotifications;
    }
}