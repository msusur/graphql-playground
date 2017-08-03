const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: String
    name: String,
    email: String,
    password: String
  }

  type Query {
    getUsers(id: String): [User]
  }
`);

module.exports = { schema };