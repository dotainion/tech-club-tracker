<?php
namespace src\module\user\service;

use tools\infrastructure\ApiRequest;
use tools\infrastructure\DateHelper;
use tools\infrastructure\exeptions\NotAuthenticatedException;
use tools\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\service\CreateGoogleCredentialService;
use src\module\login\service\GoogleLoginService;
use src\module\user\factory\UserFactory;
use src\module\user\logic\CreateUser;

class CreateGoogleUserService extends Service{
    protected CreateUser $user;
    protected UserFactory $factory;
    protected ApiRequest $api;

    public function __construct(){
        parent::__construct(false);
        $this->user = new CreateUser();
        $this->factory = new UserFactory();
        $this->api = new ApiRequest();
    }
    
    public function process($accessToken, $phoneNumber){        
        $this->api->setUrl('https://www.googleapis.com/oauth2/v1/userinfo?access_token='.$accessToken);
        $this->api->setHeader($accessToken);
        $this->api->send();

        if($this->api->hasError()){
            throw new NotAuthenticatedException('Unable to register user at this time.');
        }

        $user = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'name' => $this->api->get('name'),
            'email' => $this->api->get('email'),
            'phoneNumber' => $phoneNumber,
            'foreignId' => $this->api->get('id'),
            'picture' => $this->api->get('picture'),
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false
        ]);

        $this->user->create($user);

        (new CreateGoogleCredentialService())->process($user->id()->toString());

        $service = (new GoogleLoginService())->process($accessToken);

        $this->mergeOutput($service);
        return $this;
    }
}