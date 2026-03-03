<?php
namespace src\module\login\logic;

use tools\infrastructure\Collector;
use tools\infrastructure\Id;
use tools\infrastructure\Token;
use tools\module\login\repository\CredentialRepository;

class FetchCredential{
    protected CredentialRepository $repo;

    public function __construct(){
        $this->repo = new CredentialRepository();
    }
    
    public function byUserIdAndRefreshToken(Id $userId, Token $refreshToken):Collector{
        return $this->repo->listHasCredential([
            'id' => $userId,
            'refreshToken' => $refreshToken
        ]);
    }
}
