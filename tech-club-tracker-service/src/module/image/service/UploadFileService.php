<?php
namespace src\module\image\service;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\image\factory\ImageFactory;
use src\module\image\logic\SaveImage;
use src\module\products\logic\FetchProduct;

class UploadFileService extends Service{
    protected string $path;
    protected ImageFactory $factory;
    protected SaveImage $save;
    protected FetchProduct $product;

    public function __construct(){
        parent::__construct();
        $this->path = $_SERVER['DOCUMENT_ROOT'];
        $this->factory = new ImageFactory();
        $this->save = new SaveImage();
        $this->product = new FetchProduct();
    }
    
    public function process($file, $productId, $default, $isDocument, $fileName){
        Assert::validUuid($productId, 'Product not found.');
        Assert::arrayNotEmpty($file, 'File not found.');

        $collector = $this->product->product(new Id($productId));
        $collector->assertHasItem('Procuct not found.');

        $info = pathinfo($file['name']);
        $uniqueName = (new Id())->new()->toString();

        $target = $this->path . '/files/' . $uniqueName . '.' . $info['extension'];
        move_uploaded_file($file['tmp_name'], $target);

        empty($fileName) && $fileName = $info['filename'];

        $image = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'productId' => $productId,
            'default' => $default,
            'name' => $fileName,
            'uniqueName' => $uniqueName,
            'ext' => $info['extension'],
            'isDocument'=> $isDocument
        ]);

        $this->save->set($image);

        $this->setOutput($image);
        return $this;
    }
}