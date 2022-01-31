const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInfo: BookInfo!): User
    removeBook(bookId: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    link: String
    image: String
  }

  input BookInfo {
    bookId: String
    title: String
    authors: [String]
    description: String
    link: String
    image: String
  }
`;

module.exports = typeDefs;
