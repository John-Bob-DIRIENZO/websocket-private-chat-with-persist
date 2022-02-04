<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Http\EntryPoint\AuthenticationEntryPointInterface;

class JWTCheckerAuthenticator extends AbstractAuthenticator implements AuthenticationEntryPointInterface
{
    private string $appSecret;
    private UrlGeneratorInterface $urlGenerator;

    public function __construct(string $appSecret, UrlGeneratorInterface $urlGenerator)
    {
        $this->appSecret = $appSecret;
        $this->urlGenerator = $urlGenerator;
    }

    public function supports(Request $request): ?bool
    {
        return !empty(getallheaders()['Authorization']);
    }

    public function authenticate(Request $request): Passport
    {
        $token = str_replace('Bearer ', '', getallheaders()['Authorization']);

        try {
            $jwt = JWT::decode($token, new Key($this->appSecret, 'HS256'));

            return new SelfValidatingPassport(
                new UserBadge($jwt->username)
            );

        } catch (\Exception $exception) {
            throw new CustomUserMessageAuthenticationException('JWT invalide');
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return null;
    }

    public function start(Request $request, AuthenticationException $authException = null): Response
    {
        return new RedirectResponse($this->urlGenerator->generate('user_login'));
    }
}
