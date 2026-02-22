<?php
namespace src\module\image\objects;

use tools\infrastructure\Assert;
use tools\infrastructure\Env;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Image implements IObjects
{
    protected Id $id;
    protected Id $productId;
    protected bool $default;
    protected string $name;
    protected ?string $uniqueName;
    protected string $image;
    protected string $extention;
    protected bool $isDocument;

    public function __construct(){
        $this->id = new Id();
        $this->productId = new Id();
    }

    public function id():IId{
        return $this->id;
    }

    public function productId():IId{
        return $this->productId;
    }

    public function image():string{
        return Env::imageDomain().'/files/'.$this->fqFileName();
    }

    public function default():bool{
        return $this->default;
    }

    public function name():string{
        return $this->name;
    }

    public function fqFileName():string{
        return $this->uniqueName().'.'.$this->extention();
    }

    public function uniqueName():?string{
        return $this->uniqueName;
    }

    public function extention():string{
        return $this->extention;
    }

    public function isDocument():bool{
        return $this->isDocument;
    }

    public function size():string{
        $bytes = filesize(Env::rootDir().'/files/'.$this->fqFileName());
        if($bytes >= 1073741824){
            $bytes = number_format($bytes / 1073741824, 2) . ' GB';
        }elseif($bytes >= 1048576){
            $bytes = number_format($bytes / 1048576, 2) . ' MB';
        }elseif($bytes >= 1024){
            $bytes = number_format($bytes / 1024, 2) . ' KB';
        }elseif ($bytes > 1){
            $bytes = $bytes . ' bytes';
        }elseif($bytes == 1){
            $bytes = $bytes . ' byte';
        }else{
            $bytes = '0 bytes';
        }
        return $bytes;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }

    public function setProductId(string $productId):void{
        $this->productId->set($productId);
    }

    public function setName(string $name):void{
        Assert::maxChar($name, 255, 'You have reach the maximum charactor length.');
        $this->name = $name;
    }

    public function setDefault(bool $default):void{
        $this->default = $default;
    }

    public function setUniqueName(?string $uniqueName):void{
        $this->uniqueName = $uniqueName;
    }

    public function setExtention(string $extention):void{
        $this->extention = $extention;
    }

    public function setIsDocument(bool $isDocument):void{
        $this->isDocument = $isDocument;
    }
}

?>

