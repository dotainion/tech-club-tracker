<?php
namespace src\module\mail\factory;

use tools\infrastructure\Collector;
use tools\infrastructure\Factory;
use src\module\mail\objects\Recipient;

class RecipientFactory extends Collector{
    use Factory;

    public function __construct(){
    }
    
    public function mapResult($record):Recipient{
        $bank = new Recipient();
        $bank->setId($this->uuid($record['id']));
        $bank->setMailId($this->uuid($record['mailId']));
        $bank->setUserId($this->uuid($record['userId']));
        $bank->setRecipient($record['recipient']);
        return $bank;
    }
}