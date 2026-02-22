<?php
namespace src\module\image\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\logic\FetchImage;
use src\module\image\logic\SaveImage;

class UpdateFileNameService extends Service{
    protected FetchImage $file;
    protected SaveImage $save;

    public function __construct(){
        parent::__construct();
        $this->file = new FetchImage();
        $this->save = new SaveImage();
    }
    
    public function process($id, $fileName){
        Assert::validUuid($id, 'File not found.');
        Assert::stringNotEmpty($fileName, 'File name is required.');

        $collector = $this->file->byId(new Id($id));
        $collector->assertHasItem('File not found.');

        $image = $collector->first();
        $image->setName($fileName);

        $this->save->set($image);

        $this->setOutput($image);
        return $this;
    }
}