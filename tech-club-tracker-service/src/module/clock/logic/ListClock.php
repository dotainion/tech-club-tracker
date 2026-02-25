<?php
namespace src\module\clock\logic;

use src\module\clock\repository\ClockRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;

class ListClock{

    protected ClockRepository $repo;

    public function __construct() {
        $this->repo = new ClockRepository();
    }

    public function byId(Id $clockId):Collector{
        return $this->repo->listClocks([
            'clockId' => $clockId,
        ]);
    }

    public function active():Collector{
        return $this->repo->listClocks([
            'active' => true
        ]);
    }

    public function list(?Id $clockId, ?Id $userId, ?string $in, ?bool $active):Collector{
        return $this->repo->listClocks([
            'clockId' => $clockId,
            'userId' => $userId,
            'in' => $in,
            'active' => $active
        ]);
    }
}