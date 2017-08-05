# Graphql Lab project

This project is for running experiments using graphql as a middle layer between clients and microservices.

# Sample queries to test

```graphql
{
  users {
    name
    email
    addresses {
      city
      details
    }
  }

  user(id: "6517f9c4-5f1b-4327-a9c4-b3df60c17785") {
    name
    addresses {
      id
      city
    }
  }
}
```

# How to run?

`docker-compose up --build` will brought up 3 HTTP REST service instances.

# Services

## [User Service](./services/user-service/index.js)

A basic in memory user microservice. Listens the port `8092`.

### Endpoints

#### GET /users
Gets the array of all users.

#### GET /users/{user-id}
Get the user with the specified user id with status code 200. If the user doesn't exists returns 404.

#### POST /users
Creates a new user and returns back the user with the generated user id.

```json
// User schema
{
  "id" : "uuid",
  "name" : "string",
  "email" : "string",
  "password" : "string"
}
```

## [Address Service](./services/address-service/index.js)
A basic in memory address microservice. Listens the port `8090`.

### Endpoints

#### GET /address/{user-id}
Gets the array of addresses for specified user id.

#### POST /address
Creates a new address for the given user id.

```json
// Address schema
{
  "id": "uuid",
  "userid": "uuid",
  "details": "string",
  "city": "string"
}
```

## [Graphql Service](./services/graphql-service/index.js)
Graphql server to act as middleware between microservices or any client. Listens the port `4000`.

### Endpoints

#### GET /graphql
The Graphiql user interface to run the queries.

#### Sample Queries

There are three different query types defined to fetch the data from two microservices.

#### User Queries

`users` query helps loads all the users in the `User Microservice`.

```graphql
{
  users {
    id
    name
    email
    password
  }
}
```

`user(id)` query loads a specific user with the given id.

```graphql
{
  user(id: "user-uuid") {
    id
    name
    email
    password
  }
}
```

`Address` query is only be used as a nested field within the `user` or `users` queries.

```graphql
{
  user(id: "user-uuid") {
    name
    addresses{
      id
      city
      details
    }
  }
}
```

#### Mutations

There are two mutations defined to create data in the microservices.

`createUser` mutation creates a user and address if it is provided.

```graphql
mutation createStuff($user: UserInput!, $address: AddressInput!) {
  createUser(user: $user, address: $address) {
    id
    name
    email
    addresses {
      id
      details
      city
    }
  }
}
```

```json
// Query Variables
{
  "user": {
    "name": "Mert Susur",
    "email": "contact@codefiction.tech",
    "password": "123"
  },
  "address": {
    "details": "Stuff",
    "city": "London"
  }
}
```

`createAddress` mutation adds a new address record to the specified user.
```graphql
mutation createStuff($userid:String!, $address: AddressInput!) {
  createAddress(userid: $userid, address:$address) {
    id
    city
    details
    user {
      name
      email
    }
  }
}
```

```json
// Query Variables
{
  "userid": "8065afd2-ce8f-4d16-af19-44efe4033b50",
  "address": {
    "details": "Stuff",
    "city": "London"
  }
}
```