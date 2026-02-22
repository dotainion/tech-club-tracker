<?php

namespace src\infrastructure;

use tools\infrastructure\Repository as ToolsRepository;

class Repository extends ToolsRepository{

    public function __construct(){
        parent::permissionOff();
        parent::__construct();
    }
}
