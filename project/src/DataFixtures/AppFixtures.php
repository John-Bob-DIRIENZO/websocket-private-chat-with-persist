<?php

namespace App\DataFixtures;

use App\Factory\ChatFactory;
use App\Factory\MessageFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createMany(10);
//        ChatFactory::createMany(3);
//        MessageFactory::createMany(50);
    }
}
