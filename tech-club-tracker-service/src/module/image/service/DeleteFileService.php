<?php
namespace src\module\image\service;

use InvalidArgumentException;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\logic\FetchImage;
use src\module\image\logic\DeleteImages;

class DeleteFileService extends Service{
    protected FetchImage $image;
    protected DeleteImages $delete;

    public function __construct(){
        parent::__construct();
        $this->delete = new DeleteImages();
        $this->image = new FetchImage();
    }
    
    public function process($id){
        Assert::validUuid($id, 'Image not found.');

        $collector = $this->image->byId(new Id($id));
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Image not found.');
        }
        $image = $collector->first();
        $this->delete->byId($image->id());

        $this->setOutput($image);
        return $this;
    }
}