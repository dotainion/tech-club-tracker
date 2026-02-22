<?php
namespace src\module\image\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\repository\ImageRepository;

class ListImage{
    protected ImageRepository $repo;

    public function __construct(){
        $this->repo = new ImageRepository();
    }

    public function documentByProductId(Id $productId):Collector{
        return $this->repo->list([
            'productId' => $productId,
            'isDocument' => true
        ]);
    }

    public function byProductId(Id $productId):Collector{
        return $this->repo->list([
            'productId' => $productId,
            'isDocument' => false
        ]);
    }

    public function byProductIdArray(array $productId):Collector{
        if(empty($productId)){
            return new Collector();
        }
        return $this->repo->list([
            'productId' => $productId,
            'isDocument' => false
        ]);
    }

    public function byIdArray(array $id):Collector{
        if(empty($id)){
            return new Collector();
        }
        return $this->repo->list([
            'id' => $id,
            'isDocument' => false
        ]);
    }
}