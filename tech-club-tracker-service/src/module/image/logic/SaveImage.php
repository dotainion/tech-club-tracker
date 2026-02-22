<?php
namespace src\module\image\logic;

use tools\infrastructure\Collector;
use src\module\image\objects\Image;
use src\module\image\repository\ImageRepository;

class SaveImage{
    protected ImageRepository $repo;

    public function __construct(){
        $this->repo = new ImageRepository();
    }

    public function set(Image $image):void{
        $collector = $this->repo->list([
            'id' => $image->id(),
        ]);
        if($collector->hasItem()){
            $this->repo->edit($image);
            return;
        }
        $this->repo->create($image);
    }

    public function massSet(Collector $collector):void{
        foreach($collector->list() as $image){
            $this->set($image);
        }
    }
}