import { ApolloServer } from "apollo-server-express";
import DataLoader from "dataloader";
import express from "express";
import knexConfig from "../knexfile";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const knex = require("knex")(knexConfig.development);

const APP_PORT = process.env.PORT || 4000;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: () => {
    return {
      authorLoader: new DataLoader(async (keys: number[]) => {
        const authors: any[] = await knex("author")
          .select()
          .whereIn("id", keys);

        const authorMap: any[] = [];
        authors.forEach(author => {
          authorMap[author.id] = author;
        });

        return keys.map(key => authorMap[key]);
      }),
      postLoader: new DataLoader(async (keys: number[]) => {

        const _posts: any[] = await knex("post")
          .select("*")
          .whereIn("author", keys)

          let posts = keys.map( key => {
            return _posts.filter( post => post.author === key );
          });

          return posts
      })
    };
  }
});

const app = express();

server.applyMiddleware({ app });

app.listen(APP_PORT, () => {
  console.log(`Server is ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
})