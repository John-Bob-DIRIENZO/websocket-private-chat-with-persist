<?php

use Thruway\Authentication\AuthenticationManager;
use Thruway\Peer\Router;
use Thruway\Transport\RatchetTransportProvider;
use Websocket\AuthProvider;

require dirname(__DIR__) . '/vendor/autoload.php';

$router = new Router();
$router->registerModule(new AuthenticationManager());

$authProvider = new AuthProvider(['privateChat']);
$router->addInternalClient($authProvider);

$router->registerModule(new RatchetTransportProvider('0.0.0.0', 9090));
$router->start();
