import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    post: [Post]
  }

  type User {
    id: ID!
    name: String!
    password: String!
    salt: String!
  }

  type Query {
    post: [Post],
    author: [Author]
    user: User
  }

  type Mutation {
    createPost(id: ID!, title: String!, body: String!, author: Int!): Post!,
    register(name: String!, password: String!, salt: String!): Boolean!,
    login(username: String!, password: String!): User,
    invalidateTokens: Boolean!
  }
`;

export default typeDefs