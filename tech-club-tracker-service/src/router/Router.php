<?php
namespace src\router;

use DateTimeZone;
use permission\infrastructure\RoleAttributes;
use permission\schema\Table;
use src\infrastructure\Service;
use src\module\attendance\action\LinkStudentAction;
use src\module\attendance\action\ListAttendanceAction;
use src\module\attendance\action\ListStudentAction;
use src\module\attendance\action\SetAttendanceAction;
use src\module\attendance\action\SetStudentAction;
use tools\infrastructure\Https;
use src\module\login\action\FetchSessionAction;
use src\module\login\action\LoginAction;
use src\module\login\action\LogoutAction;
use src\module\login\action\SendRecoveryEmailAction;
use src\module\login\action\UpdateCredentialAction;
use src\module\login\action\UpdateCredentialByTokenAction;
use src\module\report\action\ListReportAction;
use src\module\report\action\SetReportAction;
use src\module\school\action\LinkSchoolToGroupAction;
use src\module\school\action\ListGroupAction;
use src\module\school\action\ListSchoolAction;
use src\module\school\action\SetGroupAction;
use src\module\school\action\SetSchoolAction;
use src\module\school\action\SetSchoolLinkAction;
use src\module\school\service\SetGroupService;
use src\module\settings\action\FetchSettingsAction;
use src\module\settings\action\SetSettingsAction;
use src\module\user\action\CreateUserAction;
use src\module\user\action\EditUserAction;
use src\module\user\action\FetchUserAction;
use src\module\user\action\ListUsersAction;
use src\schema\Schema;
use src\module\user\action\FetchAddressAction;
use src\module\user\action\SearchUsersAction;
use src\module\user\action\SetAddressAction;
use src\module\user\action\SetRoleAction;
use src\module\user\service\CreateUserService;
use tools\infrastructure\Id;
use tools\infrastructure\Repository;
use tools\SecurityTools;

class Router{
    protected Https $request;

    public function __construct($baseName){
        $this->request = new Https($baseName);
    }

    public function request(){
        return $this->request;
    }

    public function load(){
        $this->request->route('/test', function ($req){
            
        });

        $this->request->route('/schema', function ($req){
            $query = new Schema();
            $query->run();
            var_dump('Schema done running...');
        });

        /*$this->request->route('/truncate', function ($req){
            $query = new Truncate();
            $query->run();
        });*/

        $this->request->route('/setup', function ($req){
            var_dump('Creating admin account and roles...<br/>');
            $userId = (new Id())->new()->toString();
            (new CreateUserService())->process(
                $userId,
                'Admin', 
                'Administrator', 
                'example@example.com', 
                null, 
                'Male', 
                'User1234#', 
                'User1234#',
                RoleAttributes::ADMIN, 
                true, 
                true, 
                true, 
                true
            );
            var_dump('Creating default groups...<br/>');
            (new SetGroupService(false))->process(
                (new Id())->new()->toString(),
                'Beginner',
                'For students who are just starting out. Learn the fundamentals, explore basic concepts, and get hands-on experience with simple projects.',
                false,
                false
            );
            (new SetGroupService(false))->process(
                (new Id())->new()->toString(),
                'Intermediate',
                'For students with some experience. Build on your skills, work on larger projects, and start solving real-world problems with guidance.',
                false,
                false
            );
            (new SetGroupService(false))->process(
                (new Id())->new()->toString(),
                'Advanced',
                'For experienced students. Tackle complex projects, explore advanced topics, and develop skills to create professional-level solutions.',
                false,
                false
            );
            var_dump('Task completed!');
        });

        $this->request->route('/signin', function ($req){
            return new LoginAction();
        });

        $this->request->route('/logout', function ($req){
            return new LogoutAction();
        });

        $this->request->route('/fetch/session', function ($req){
            return new FetchSessionAction();
        });

        $this->request->route('/update/credential', function ($req){
            return new UpdateCredentialAction();
        });

        $this->request->route('/update/credential/with/refersh/token', function ($req){
            return new UpdateCredentialByTokenAction();
        });

        $this->request->route('/recover/account', function ($req){
            return new SendRecoveryEmailAction();
        });

        $this->request->route('/list/users', function ($req){
            return new ListUsersAction();
        });

        $this->request->route('/create/user', function ($req){
            return new CreateUserAction();
        });

        $this->request->route('/edit/user', function ($req){
            return new EditUserAction();
        });

        $this->request->route('/fetch/user', function ($req){
            return new FetchUserAction();
        });

        $this->request->route('/search/users', function ($req){
            return new SearchUsersAction();
        });

        $this->request->route('/set/address', function ($req){
            return new SetAddressAction();
        });

        $this->request->route('/fetch/address', function ($req){
            return new FetchAddressAction();
        });

        $this->request->route('/set/role', function ($req){
            return new SetRoleAction();
        });

        $this->request->route('/set/student', function ($req){
            return new SetStudentAction();
        });

        $this->request->route('/list/student', function ($req){
            return new ListStudentAction();
        });

        $this->request->route('/assign/student', function ($req){
            return new LinkStudentAction();
        });

        $this->request->route('/log/attendance', function ($req){
            return new SetAttendanceAction();
        });

        $this->request->route('/list/attendance', function ($req){
            return new ListAttendanceAction();
        });

        $this->request->route('/set/report', function ($req){
            return new SetReportAction();
        });

        $this->request->route('/list/report', function ($req){
            return new ListReportAction();
        });

        $this->request->route('/set/school', function ($req){
            return new SetSchoolAction();
        });

        $this->request->route('/set/group', function ($req){
            return new SetGroupAction();
        });

        $this->request->route('/list/school', function ($req){
            return new ListSchoolAction();
        });

        $this->request->route('/list/group', function ($req){
            return new ListGroupAction();
        });

        $this->request->route('/set/school/link', function ($req){
            return new SetSchoolLinkAction();
        });

        $this->request->route('/set/school/to/group/link', function ($req){
            return new LinkSchoolToGroupAction();
        });

        $this->request->route('/fetch/settings', function ($req){
            return new FetchSettingsAction();
        });

        $this->request->route('/set/settings', function ($req){
            return new SetSettingsAction();
        });
    }

    public function execute(){
        $this->request->__INIT__();
    }
}

?>
