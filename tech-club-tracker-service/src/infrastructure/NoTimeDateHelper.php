<?php
namespace src\infrastructure;

use InvalidArgumentException;
use tools\infrastructure\DateHelper;

class NoTimeDateHelper extends DateHelper{
    protected string $message = 'Invalid date format.';
    protected DateHelper $dateHelper;

    public function __construct(?string $date = null, ?string $message=null) {
        $this->dateHelper = new DateHelper();
        ($date !== null) && $this->validate($date, $message);
    }

    public function ymd():string{
        $date = $this->dateHelper->toString();
        [$y, $m, $d] = explode('-', explode(' ', $date)[0]);
        return "$y-$m-$d";
    }

    public function ym():string{
        $date = $this->dateHelper->toString();
        [$y, $m] = explode('-', explode(' ', $date)[0]);
        return "$y-$m";
    }

    public function validate(string $date, ?string $message=null):self{
        //2026-02-07
        $this->assertValidation($date, $message);
        $yMd = explode('-', explode(' ', $date)[0]);
        !isset($yMd[2]) && $yMd[2] = '01';
        [$y, $m, $d] = $yMd;
        $this->dateHelper = $this->set("$y-$m-$d 00:00:00");
        return $this->dateHelper;
    }

    public function checkValidation(string $date):bool{
        if(strlen($date) === 0){
            return false;
        }
        [$y, $m] = explode('-', explode(' ', $date)[0]);
        if(strlen($y) !== 4 || strlen($m) !== 2){
            return false;
        }
        return true;
    }

    public function assertValidation(string $date, ?string $message=null):self{
        if(!$this->checkValidation($date)){
            throw new InvalidArgumentException($message ?? $this->message);
        }
        return $this;
    }
}