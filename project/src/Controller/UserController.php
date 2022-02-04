<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class UserController extends AbstractController
{
    #[Route('/', name: 'user_index')]
    #[IsGranted('ROLE_USER')]
    public function test(Request $request): JsonResponse
    {
        return $this->json([
            'headers' => getallheaders()["Authorization"]
        ]);
    }

    #[Route('/login', name: 'user_login')]
    public function login(string $appSecret): JsonResponse
    {
        /** @var $user ?User */
        $user = $this->getUser();

        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $jwt = JWT::encode([
            'username' => $user->getUsername(),
            'id' => $user->getId()
        ],
            $appSecret,
            'HS256');

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ApiLoginController.php',
            'jwt' => $jwt
        ]);
    }

    #[Route('/user-list', name: 'user_list', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function userList(UserRepository $userRepository): JsonResponse
    {
        return $this->json([
            'users' => $userRepository->findAllButMe($this->getUser())
        ], 200, [], ['groups' => 'main']);
    }

    #[Route('/new-user/{username}-{password}', name: 'user_create')]
    public function createUser(string                      $username,
                               string                      $password,
                               UserPasswordHasherInterface $hasher,
                               EntityManagerInterface      $entityManager): JsonResponse
    {
        $user = new User();
        $user->setUsername($username)
            ->setPassword($hasher->hashPassword($user, $password));

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'New user created',
            'username' => $username,
            'password' => $password
        ]);
    }
}