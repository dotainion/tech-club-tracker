<?php

namespace src\infrastructure;

use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class StringId implements IId, IObjects{
    protected ?string $uuid = null;

    public function __construct(?string $uuid = null){
        ($uuid !== null) && $this->set($uuid);
    }

    final public function __toString():string{
        return $this->toString();
    }

    final public function toString():string{
        return $this->uuid;
    }

    final public function id():IId{
        return $this;
    }

    final public function hasId():bool{
        return $this->uuid !== null;
    }

    final public function new():self{
        $this->uuid = (new Id())->new()->toString();
        return $this;
    }

    final public function set(?string $uuid):self{
        Assert::stringNotEmpty($uuid, 'String id is not valid.');
        $this->uuid = (string)$uuid;
        return $this;
    }
}
