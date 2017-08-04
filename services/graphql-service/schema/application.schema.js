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
});

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

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'Input user type.',
  type: GraphQLInputObjectType,
  fields: () => {
    return {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    };
  }
});

const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInput',
  description: 'Input Address type.',
  type: GraphQLInputObjectType,
  fields: () => {
    return {
      details: { type: GraphQLString },
      city: { type: GraphQLString },
    }
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
      user: {
        type: new GraphQLNonNull(UserInputType)
      },
      address: {
        type: new GraphQLNonNull(AddressInputType)
      }
    },
    resolve: (source, args) => {
      return userProvider.createUser(args.user)
        .then((user) => {
          if (args.address) {
            addressProvider.createAddress(user.id, args.address);
          }
          return user;
        });
    }
  },
  createAddress: {
    type: AddressType,
    args: {
      userid: {
        type: new GraphQLNonNull(GraphQLString)
      },
      address: {
        type: new GraphQLNonNull(AddressInputType)
      }
    },
    resolve: (source, args) => addressProvider.createAddress(args.userid, args.address)
  }
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