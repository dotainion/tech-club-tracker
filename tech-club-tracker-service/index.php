<?php

require_once(__DIR__.'/vendor/autoload.php');

use tools\infrastructure\Env;
use tools\infrastructure\StatusCode;
use src\router\Router;
//use Throwable;

try{
    Env::loadEnv();
    $status = new StatusCode();
    $status->handleExeption(function(){
        $router = new Router(basename(__DIR__));
        $router->load();
        $router->execute();
    });
}catch(Throwable $ex){
    echo $ex->getMessage() . PHP_EOL . $ex->getTraceAsString();
}
