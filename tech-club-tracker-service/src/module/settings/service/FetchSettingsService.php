<?php
namespace src\module\settings\service;

use src\infrastructure\Service;
use src\module\settings\logic\FetchSettings;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;

class FetchSettingsService extends Service{
    protected FetchSettings $settings;

    public function __construct(){
        parent::__construct();
        $this->settings = new FetchSettings();
    }
    
    public function process($userId, $useDefaultIfSettingsNotExist){
        Assert::validUuid($userId, 'Settings not found.');
        
        if($useDefaultIfSettingsNotExist === true){
            $this->settings->useDefaultIfSettingsNotExist();
        }

        $settings = $this->settings->byUserId(new Id($userId));

        $this->setOutput($settings);
        return $this;
    }
}