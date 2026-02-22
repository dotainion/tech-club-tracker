<?php
namespace src\module\login\service;

use InvalidArgumentException;
use src\infrastructure\Service;
use src\module\login\logic\TokenizeCredential;
use src\module\mail\service\SendMailService;
use src\module\user\logic\FetchUser;
use Throwable;
use tools\infrastructure\Id;
use tools\SecurityTools;

class CreateCredentialService extends Service{
    protected SecurityTools $secure;
    protected SendMailService $notify;
    protected FetchUser $user;
    protected TokenizeCredential $tokenize;

    public function __construct(){
        parent::__construct(false);
        $this->secure = new SecurityTools();
        $this->notify = new SendMailService(false);
        $this->user = new FetchUser();
        $this->tokenize = new TokenizeCredential();
    }
    
    public function process($id, $password){

        $serivce = $this->secure->createCredential($id, $password);

        try{
            $collector = $this->user->user(new Id($id));
            $collector->assertHasItem('User not found.');
            $user = $collector->first();
            
            $domainName = $_SERVER['SERVER_NAME'];
            $route = '/update/credential/by/token/';
            $dir = '/tech-club-tracker-service';

            $credential = $this->tokenize->byUserId($user->id());

            $href = $domainName.$dir.'/#'.$id.'/'.$route.$credential->refreshToken();

            $this->notify->process(
                'Tech Club Tracking Service',
                '
                    <h1>Welcome to the tech club tracking system</h1>
                    <p>This system allows you to manage attendance, track daily engagement and progress.</p>
                    <br/>
                    <p>An account was created for you.</p>
                    <a href="' . $href . '">Click here to set up your credentials and loggin</a>
                    <br/>
                    <strong>This link will expire in 3 days.</strong>
                ',
                [[
                    'userId' => $user->id()->toString(),
                    'recipient' => $user->email(),
                ]],
                null
            );
        }catch(Throwable $ex){
            throw new InvalidArgumentException('Cretentials created but email was not sent. ERROR: ' . $ex->getMessage());
        }

        return $this->mergeOutput($serivce);
    }
}