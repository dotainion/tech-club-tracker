<?php
namespace src\module\attendance\objects;

use src\infrastructure\NoTimeDateHelper;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Email;
use tools\infrastructure\Id;
use tools\infrastructure\IId;
use tools\infrastructure\IObjects;

class Student implements IObjects{
    protected Id $id;
    protected string $firstName;
    protected string $lastName;
    protected ?Email $email;
    protected string $contact;
    protected string $gender;
    protected ?DateHelper $dob;
    protected string $grade;
    protected string $status;
    protected bool $hide = false;
    protected Collector $attendances;
    protected Collector $studentLinks;

    public function __construct(
        string $studentId,
        string $firstName,
        string $lastName,
        string $email,
        string $contact,
        string $gender,
        string $dob,
        string $grade,
        string $status,
        bool $hide
    ){
        $this->id = new Id($studentId);
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = !empty($email) ? new Email($email) : null;
        $this->contact = $contact;
        $this->gender = $gender;
        $this->dob = !empty($dob) ? new NoTimeDateHelper($dob) : null;
        $this->grade = $grade;
        $this->status = $status;
        $this->hide = $hide;
        $this->attendances = new Collector();
        $this->studentLinks = new Collector();
    }

    public function id():IId{
        return $this->id;
    }

    public function firstName():string{
        return $this->firstName;
    }
    
    public function lastName():string{
        return $this->lastName;
    }
    
    public function fullName():string{
        return trim($this->firstName() . ' ' . $this->lastName());
    }

    public function email():?Email{
        return $this->email;
    }

    public function contact():string{
        return $this->contact;
    }
    
    public function gender():string{
        return $this->gender;
    }
    
    public function dob():?DateHelper{
        return $this->dob;
    }

    public function grade():string{
        return $this->grade;
    }

    public function status():string{
        return $this->status;
    }

    public function hide():bool{
        return $this->hide;
    }

    public function attendances():?Collector{
        return $this->attendances;
    }

    public function studentLinks():Collector{
        return $this->studentLinks;
    }
}