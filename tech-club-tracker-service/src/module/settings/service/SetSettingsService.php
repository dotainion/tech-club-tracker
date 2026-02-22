<?php
namespace src\module\settings\service;

use permission\infrastructure\RoleAttributes;
use src\infrastructure\Service;
use src\module\settings\factory\SettingsFactory;
use src\module\settings\logic\SetSettings;
use src\module\user\service\SetRoleService;
use tools\infrastructure\Assert;

class SetSettingsService extends Service{
    protected SettingsFactory $factory;
    protected SetSettings $settings;

    public function __construct(){
        parent::__construct();
        $this->factory = new SettingsFactory();
        $this->settings = new SetSettings();
    }
    
    public function process(
        $userId,
        $isActive,
        $checkAttendance,
        $manageSchoolGroupStudent,
        $generateReports,
        $isAdmin,
        $manageUsers,
        $viewReports,
        $sendNotifications,
        $read,
        $write,
        $edit,
        $delete
    ){
        Assert::validUuid($userId, 'User not found.');

        $settings = $this->factory->mapResult([
            'userId' => $userId,
            'isActive' => $isActive,
            'checkAttendance' => $checkAttendance,
            'manageSchoolGroupStudent' => $manageSchoolGroupStudent,
            'generateReports' => $generateReports,
            'isAdmin' => $isAdmin,
            'manageUsers' => $manageUsers,
            'viewReports' => $viewReports,
            'sendNotifications' => $sendNotifications
        ]);

        $this->settings->set($settings);

        (new SetRoleService())->process(
            $userId,
            $isAdmin ? RoleAttributes::ADMIN : RoleAttributes::MEMBER,
            $read,
            $write,
            $edit,
            $delete
        );

        $this->setOutput($settings);
        return $this;
    }
}