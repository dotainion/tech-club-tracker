<?php
namespace src\module\image\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\image\objects\Image;

class ImageFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):Image{
        $product = new Image();
        $product->setId($this->uuid($record['id']));
        $product->setProductId($this->uuid($record['productId']));
        $product->setDefault(((bool)$record['default'])??'');
        $product->setName($record['name']);
        $product->setUniqueName($record['uniqueName']);
        $product->setExtention($record['ext']);
        $product->setIsDocument($record['isDocument']);
        return $product;
    }
}