const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema/application.schema');
const userProvider = require('./data-providers/user-provider.js');
const app = express();

const rootValue = {
  getUsers: ($id) => userProvider.getUsers($id)
  //createUser: ($user) => userProvider.createUser($user)
};


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
