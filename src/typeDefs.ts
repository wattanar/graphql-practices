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

  type Query {
    post: [Post],
    author: [Author]
  }

  type Mutation {
    createPost(id: ID!, title: String!, body: String!, author: Int!): Post!
  }
`;

export default typeDefs