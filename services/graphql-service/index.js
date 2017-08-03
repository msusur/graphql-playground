const express = require('express');
const graphqlHTTP = require('express-graphql');
const { applicationSchema } = require('./schema');
// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  graphiql: process.env.NODE_ENV === 'development',
  schema: applicationSchema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
