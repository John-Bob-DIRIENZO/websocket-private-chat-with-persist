<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Service\PrivateTopicHelper;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{topic}', name: 'chat_getMessages', methods: 'GET')]
    #[IsGranted('ROLE_USER')]
    public function getChatMessages(ChatRepository     $chatRepository,
                                    Request            $request,
                                    PrivateTopicHelper $topicHelper,
                                    string             $topic): JsonResponse
    {
        /** @var $user User */
        $user = $this->getUser();

        if (!$topicHelper->isUserInThisTopic($user->getId(), $topic)) {
            return $this->json([
                'status' => 0,
                'error' => "This user doesn't belong to this topic"
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return $this->json([
            'chat' => $chatRepository->getAllMessagesOrderByDate($topic)
        ], 200, [], ['groups' => ['main']]);
    }

    #[Route('/chat/persist-message', name: 'chat_persistMessage', methods: 'POST')]
    #[IsGranted('ROLE_USER')]
    public function persistMessage(Request                $request,
                                   ChatRepository         $chatRepository,
                                   EntityManagerInterface $entityManager,
                                   PrivateTopicHelper     $topicHelper): JsonResponse
    {
        /** @var $user User */
        $user = $this->getUser();
        $chat = $chatRepository->findOneBy(['topic' => $request->request->get('topic')]);

        if (!$chat) {
            $chat = new Chat();
            $chat->setTopic($request->request->get('topic'));
            $entityManager->persist($chat);
        }

        $content = $request->request->get('content');

        try {
            if (!$topicHelper->isUserInThisTopic($user->getId(), $request->request->get('topic'))) {
                return $this->json([
                    'status' => 0,
                    'error' => "This user doesn't belong to this topic"
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $message = new Message();
            $message->setUser($user)
                ->setChat($chat)
                ->setDate(new \DateTime())
                ->setContent($content);

            $entityManager->persist($message);
            $entityManager->flush();

            return $this->json([
                'status' => 1
            ], Response::HTTP_CREATED);

        } catch (\Exception $exception) {
            return $this->json([
                'status' => 0,
                'error' => $exception->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}