<?php

namespace Websocket;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Thruway\Authentication\AbstractAuthProviderClient;

class AuthProvider extends AbstractAuthProviderClient
{
    /**
     * @return string
     */
    public function getMethodName(): string
    {
        return 'JWT';
    }

    /**
     * Process Authenticate message
     *
     * @param mixed $signature
     * @param mixed $extra
     * @return array
     */
    public function processAuthenticate($signature, $extra = null): array
    {
        try {
            $jwt = JWT::decode($signature, new Key($_ENV['APP_SECRET'], 'HS256'));
            return ["SUCCESS", (object)[
                'jwt' => $jwt
            ]];
        } catch (\Exception $exception) {
            return ["FAILURE"];
        }
    }
}