const {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLScalarType,
  GraphQLEnumType
} = require('graphql');

const userProvider = require('../data-providers/user-provider.js');


// const schema = buildSchema(`
//   type User {
//     id: ID
//     name: String!
//     email: String!
//     password: String!
//     address: [Address]
//   }

//   type Address {
//     id: ID
//     detail: String!
//     city: String!
//     user: User!
//   }

//   type Query {
//     getUsers(id: String): [User]
//     getAddressByUser(userid: String!): [Address]
//   }
// `);

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'user api',
  type: GraphQLObjectType,
  fields: () => {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    };
  }
});


const FIELDS = {
  applicationAPI: {
    type: GraphQLString,
    description: 'About the API',
    resolve() {
      return 'It is an API.';
    }
  },
  user: {
    type: UserType,
    args: {
      id: {
        description: 'User id',
        type: new GraphQLNonNull(GraphQLString)
      },
    },
    resolve: (_, { id, identity }) => userProvider.getUsers(id)
  }
};

const queryObjectType = new GraphQLObjectType({
  name: 'ApplicationAPI',
  description: 'APIs for users and stuff',
  fields: () => FIELDS
});

module.exports = { QueryObjectType: queryObjectType };