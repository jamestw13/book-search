const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select('-__v -password');
      }
      throw new AuthenticationError('Not logged in.');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (user) {
        const validPassword = await user.isCorrectPassword(password);
        if (validPassword) {
          const token = signToken(user);
          return { user, token };
        }
      }
      throw new AuthenticationError('Incorrect credentials');
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },

    saveBook: async (parent, { bookInfo }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookInfo } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError('User must be logged in.');
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError('User must be logged in.');
    },
  },
};

module.exports = resolvers;
