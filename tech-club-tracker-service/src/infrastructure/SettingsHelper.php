<?php
namespace src\infrastructure;

use InvalidArgumentException;
use src\module\settings\logic\FetchSettings;
use src\module\settings\objects\Settings;
use tools\infrastructure\Id;
use tools\security\SecurityManager;

class SettingsHelper extends Service{

    protected static ?Settings $settings = null;

    public function __construct() {
        $this->initialize($this->user()->id());
    }

    public function initialize(Id $userId):self{
        if(self::$settings === null){
            return $this;
        }
        self::$settings = (new FetchSettings())->byUserId($userId);
        return $this;
    }

    public function assertIsActive():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('Your account is inactive.');
        }
        return true;
    }

    public function assertCheckAttendance():true{
        $user = (new SecurityManager())->user();
        if(!$user->role()->isAdmin()){
            throw new InvalidArgumentException('You do not have permission to manage attendance.');
        }
        return true;
    }

    public function assertManageSchoolGroupStudent():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('You do not have permission to manage this activity.');
        }
        return true;
    }

    public function assertGenerateReports():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('You do not have permission to generate a report.');
        }
        return true;
    }

    public function assertIsAdmin():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('You do not have permission. Please contact your administrator for assistance.');
        }
        return true;
    }

    public function assertManageUsers():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('You do not have permission to manage users.');
        }
        return true;
    }

    public function assertViewReports():true{
        if(!self::$settings->isActive()){
            throw new InvalidArgumentException('You do not have permission to manage reports.');
        }
        return true;
    }
}