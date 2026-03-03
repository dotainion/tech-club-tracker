<?php
namespace src\module\login\service;

use src\infrastructure\Service;
use src\module\login\logic\FetchCredential;
use tools\infrastructure\Assert;
use tools\infrastructure\Id;
use tools\infrastructure\Token;

class VerifyCredentialTokenService extends Service{
    protected FetchCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->credential = new FetchCredential();
    }
    
    public function process($userId, $refreshToken){
        Assert::stringNotEmpty($userId, 'User not found.');

        $collector = $this->credential->byUserIdAndRefreshToken(new Id($userId), new Token($refreshToken));
        $collector->assertHasItem('Credentials not found.');
        
        return $this->setOutput($collector);
    }
}