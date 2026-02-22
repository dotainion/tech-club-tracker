<?php
namespace src\module\image\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\logic\FetchImage;
use src\module\image\logic\SaveImage;

class SetFileAsDefaultService extends Service{
    protected FetchImage $file;
    protected SaveImage $save;

    public function __construct(){
        parent::__construct();
        $this->file = new FetchImage();
        $this->save = new SaveImage();
    }
    
    public function process($id){
        Assert::validUuid($id, 'File not found.');

        $collector = $this->file->byId(new Id($id));
        $collector->assertHasItem('File not found.');

        $image = $collector->first();
        $image->setDefault(true);

        $collector = $this->file->byProductId($image->productId());
        foreach($collector->list() as $file){
            $isDefault = $file->id()->toString() === $id;
            $file->setDefault($isDefault);
        }

        $this->save->massSet($collector);

        $this->setOutput($image);
        return $this;
    }
}