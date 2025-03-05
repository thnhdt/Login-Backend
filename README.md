NEW:
Docker compose:
    when restart || change:
        docker-compose down 
    build:
        docker-compose up --build -d
    test network:
        docker network ls
    check logs:
        docker-compose logs < container name >
    

OLD:
1.Run BE:
    -cd BE
    -npm intall
    -node app.js

2.Run FE:
    -cd D
    -npm i
    -npm run dev?

3. Run redis:
    - Redis insight localhost:8001


4. Run RabbitMQ:
   -docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
   {
    'username': 'guest',
    'password': 'guest',
   }

   docker compose
   docker-compose -f docker-compose.yml -f .debug.yml up

   docker-compose up --build

