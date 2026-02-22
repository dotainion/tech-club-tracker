<?php
namespace src\module\login\logic;

use src\module\login\repository\CredentialRepository;
use tools\infrastructure\Collector;
use tools\infrastructure\DateHelper;
use tools\infrastructure\Id;
use tools\infrastructure\Token;
use tools\module\login\factory\CredentialFactory;
use tools\module\login\objects\Credential;

class TokenizeCredential{
    protected CredentialRepository $repo;
    protected CredentialFactory $factory;

    public function __construct(){
        $this->repo = new CredentialRepository();
        $this->factory = new CredentialFactory();
    }
    
    public function byUserId(Id $userId):Credential{
        $collector = $this->repo->listCredentials([
            'id' => $userId
        ]);
        $collector->assertHasItem('User not found.');

        $token = new Token();
        $token->new();

        $credential = $this->factory->mapResult([
            'id' => $userId,
            'refreshToken' => $token->toString(),
            'expire' => (new DateHelper())->new()->addDays(3)->toString(),
        ]);

        $this->repo->edit($credential);
        return $credential;
    }
}
