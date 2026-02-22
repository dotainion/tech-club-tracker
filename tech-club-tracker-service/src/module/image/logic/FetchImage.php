<?php
namespace src\module\image\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\repository\ImageRepository;

class FetchImage{
    protected ImageRepository $repo;

    public function __construct(){
        $this->repo = new ImageRepository();
    }

    public function byId(Id $id):Collector{
        return $this->repo->list([
            'id' => $id
        ]);
    }

    public function image(string $name):Collector{
        return $this->repo->list([
            'name' => $name,
            'isDocument' => false
        ]);
    }

    public function byProductId(Id $productId):Collector{
        return $this->repo->list([
            'productId' => $productId,
            'isDocument' => false
        ]);
    }
}