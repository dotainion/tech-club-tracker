<?php
namespace src\module\image\repository;

use src\infrastructure\Repository;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\factory\ImageFactory;
use src\module\image\objects\Image;

class ImageRepository extends Repository{
    protected ImageFactory $factory;

    public function __construct(){
        parent::__construct();
        $this->factory = new ImageFactory();
    }
    
    public function create(Image $image):void{
        $this->insert('images')        
            ->column('id', $this->uuid($image->id()))
            ->column('name', $image->name())
            ->column('uniqueName', $image->uniqueName())
            ->column('productId', $this->uuid($image->productId()))
            ->column('default', $image->default())
            ->column('ext', $image->extention())
            ->column('isDocument', $image->isDocument());
        $this->execute();
    }
    
    public function edit(Image $image):void{
        $this->update('images')   
            ->column('name', $image->name())
            ->column('uniqueName', $image->uniqueName())
            ->column('productId', $this->uuid($image->productId()))
            ->column('default', $image->default())
            ->column('ext', $image->extention())
            ->column('isDocument', $image->isDocument())
            ->where()->eq('id', $this->uuid($image->id()));
        $this->execute();
    }
    
    public function deleteImages(Id $id):void{
        $this->delete('images') 
            ->where()->eq('id', $this->uuid($id));
        $this->execute();
    }
    
    public function list(array $where):Collector{
        $this->select('images');

        if(isset($where['id'])){
            $this->where()->eq('id', $this->uuid($where['id']));
        }
        if(isset($where['name'])){
            $this->where()->eq('name', $where['name']);
        }
        if(isset($where['isDocument'])){
            $this->where()->eq('isDocument', (int)$where['isDocument']);
        }
        if(isset($where['productId'])){
            $this->where()->eq('productId', $this->uuid($where['productId']));
        }
        if(isset($where['default'])){
            $this->where()->eq('default', $where['default']);
        }
        if(isset($where['ext'])){
            $this->where()->eq('ext', $where['ext']);
        }
        $this->execute();
        return $this->factory->map(
            $this->results()
        );
    }
}