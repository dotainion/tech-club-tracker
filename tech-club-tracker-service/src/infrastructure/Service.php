<?php

namespace src\infrastructure;

use src\module\user\factory\UserFactory;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Service as ToolsService;
use tools\security\Setup;

class Service extends ToolsService{

    public function __construct(bool $authCheck=true){
        Setup::setRequiredFactory(new UserFactory());
        DateHelper::setTimezone($_SERVER['HTTP_TIMEZONE'] ?? 'UTC');
        parent::__construct($authCheck);
        //(new SettingsHelper())->assertIsActive();
    }
}
