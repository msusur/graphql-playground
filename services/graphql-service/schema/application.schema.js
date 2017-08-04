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
  GraphQLEnumType,
  GraphQLInputObjectType
} = require('graphql');

const userProvider = require('../data-providers/user-provider.js');
const addressProvider = require('../data-providers/address-provider.js');

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'Address of the users.',
  type: GraphQLObjectType,
  fields: () => {
    return {
      id: { type: GraphQLID },
      details: { type: GraphQLString },
      city: { type: GraphQLString },
      user: {
        type: UserType,
        description: 'Owner of the Address',
        resolve: (args) => userProvider.getUser(args.userid)
      }
    }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Users of the application',
  type: GraphQLObjectType,
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      addresses: {
        type: new GraphQLList(AddressType),
        description: 'List of addresses of the user.',
        resolve: (args) => addressProvider.getAddress(args.id)
      }
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
        type: GraphQLString
      },
    },
    resolve: (_, { id }) => userProvider.getUser(id)
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (_) => userProvider.getAllUsers()
  },
  addresses: {
    type: new GraphQLList(AddressType),
    args: {
      userid: {
        description: 'User id.',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (_, { userid }) => addressProvider.getAddress(userid)
  }
};

const queryObjectType = new GraphQLObjectType({
  name: 'ApplicationAPI',
  description: 'APIs for users and stuff',
  fields: () => FIELDS
});

const MUTATION_FIELDS = {
  createUser: {
    type: UserType,
    args: {
      userInput: {
        type: UserType
      },
      addressInput: {
        type: AddressType)
      }
    },
    resolver: (source, args) => {
      return userProvider.createUser(args.name, args.email, args.password)
        .then((user) => {
          if (args.address) {
            addressProvider.createAddress(user.id, args.address.detail, args.address.city);
          }
          return user;
        });
    }
  }
  // ,  createAddress: {

  // }
};

const mutationType = new GraphQLObjectType({
  name: 'ApplicationMutationAPI',
  description: 'APIs for users to mutation',
  fields: () => MUTATION_FIELDS
});

module.exports = {
  QueryObjectType: queryObjectType,
  MutationsType: mutationType
};