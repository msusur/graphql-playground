const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const { schema, QueryObjectType } = require('./schema/application.schema');
const userProvider = require('./data-providers/user-provider.js');
const addressProvider = require('./data-providers/address-provider.js');
const app = express();

const rootValue = {
};

let Schema = new GraphQLSchema({
  query: QueryObjectType
});


app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: Schema,
  rootValue,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
