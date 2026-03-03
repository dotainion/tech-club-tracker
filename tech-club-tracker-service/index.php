<?php

require_once(__DIR__.'/vendor/autoload.php');

use tools\infrastructure\Env;
use src\router\Router;
use tools\infrastructure\exeptions\ExceptionMessanger;

class Index extends ExceptionMessanger{
    protected bool $hasFallback = false;

    public function __construct(){
        Env::loadEnv();
        $this->startSession();
        $this->allowCorsOriginAccess();
    }

    public function run():self{
        return $this->loadFallbackException(function(){
            $this->handleExeption(function(){
                $router = new Router(basename(__DIR__));
                $router->load();
                $router->execute();
            });
        });
    }

    private function loadFallbackException(callable $callback):self{
        try{
            $callback();
        }catch(Throwable $ex){
            $this->setExceptionRequirements($ex, $this->INTERNAL_SERVER_ERROR);
            $this->sendResponse();
        }
        return $this;
    }
}

$index = new Index();
$index->run();
