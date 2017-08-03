# Graphql Lab project

This project is aiming to run experiments using graphql as a middle layer between user interface and microservices.

# How to run?

`docker-compose up --build` will brought up 4 service instances.

[User Service](./services/user-service/index.js): Basic user CRUD service.
[Graphql Service](./services/graphql-service/index.js): Graphql server to accept queries and mutations.
...
*other services are in progress*