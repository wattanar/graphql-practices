import { ApolloServer } from "apollo-server-express";
import express from "express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const APP_PORT = process.env.PORT || 4000;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req }) => { req }
});

const app = express();

server.applyMiddleware({ app });

app.listen(APP_PORT, () => {
  console.log(`Server is ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
})