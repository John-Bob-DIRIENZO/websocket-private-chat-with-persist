# Un chat, genre comme celui d'Instagram mais en (beaucoup) moins bien

Le but ici était d'utiliser les Websockets et le protocole
WAMP pour créer un chat privé, avec un système d'auth et de
pérennisation des messages en DB

Le système est donc composé des briques suivantes : 
- Un back Symfony qui va gérer l'auth des users et l'enregistrement des messages en DB
- Un front en React qui prend la charge d'être un terminal de gestion de messages
- Un serveur Websocket qui sert juste de Broker et distribue les messages entre les fronts

Pour lancer le projet faut
```shell
cd project
composer install
cd ../websocket
composer install
cd ..
docker-compose up -d
cd frontend
npm install
npm run start
```

Puis, depuis un autre terminal (parce que React à bloqué le précédent)
```shell
docker exec symfony_docker symfony console doctrine:migrations:migrate
symfony console doctrine:fixtures:load
```

Rendez-vous ensuite sur http://localhost:8080 <br>
user : root <br>
no password

et prenez des utilisateurs au hasard, leurs password est 'password'