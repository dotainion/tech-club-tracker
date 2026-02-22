<?php
namespace src\module\image\logic;

use InvalidArgumentException;
use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use src\module\image\objects\Image;
use src\module\image\repository\ImageRepository;

class DeleteImages{
    protected FetchImage $fetch;
    protected ImageRepository $repo;
    protected string $path;

    public function __construct(){
        $this->repo = new ImageRepository();
        $this->fetch = new FetchImage();
        $this->path = $_SERVER['DOCUMENT_ROOT'];
    }

    public function byId(Id $id):void{
        $collector = $this->fetch->byId($id);
        $this->deleteFile($collector->first());
        $this->repo->deleteImages($id);
    }

    public function byProductId(Id $productId):void{
        $collector = $this->fetch->byProductId($productId);
        $this->deleteFileCollection($collector);
        $this->repo->deleteImages($productId);
    }

    public function deleteFile(Image $image):bool{
        if (!unlink($this->path . '/files/'.$image->fqFileName())){ 
            throw new InvalidArgumentException('Unable to delete a file.');
        } 
        return true;
    }

    public function deleteFileCollection(Collector $collector):void{
        foreach($collector->list() as $image){
            $this->deleteFile($collector->first());
        }
    }
}