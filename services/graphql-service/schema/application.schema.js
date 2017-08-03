const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const applicationSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

export { applicationSchema };