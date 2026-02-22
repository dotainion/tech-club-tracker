<?php
namespace src\module\settings\logic;

use src\module\settings\objects\Settings;
use src\module\settings\repository\SettingsRepository;

class SetSettings{

    protected SettingsRepository $repo;

    public function __construct() {
        $this->repo =new SettingsRepository();
    }

    public function set(Settings $settings):void{
        $collector = $this->repo->listSettings([
            'userId' => $settings->id()
        ]);
        if($collector->hasItem()){
            $this->repo->edit($settings);
            return;
        }
        $this->repo->create($settings);
    }
}