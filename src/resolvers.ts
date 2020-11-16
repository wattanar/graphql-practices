import knexConfig from "../knexfile";
import { authorLoader, postLoader } from "./loader";

const knex = require("knex")(knexConfig);

const resolvers = {
  Query: {
    post: async () => {
      return await knex("post").select("*")
    },
    author: async () => {
      return await knex("author").select("*")
    }
  },
  Mutation: {
    createPost: async (_ : any, { title, body, author } : any) => {
      const createdId = await knex("post").insert({ title, body, author });
      return { createdId, title, body, author };
    }
  },
  Post : {
    author: async (parent: any, _: any, ctx: any) => {
      return authorLoader.load(parent.author);
    }
  },
  Author: {
    post: async (parent: any, _: any, ctx: any) => {
      return postLoader.load(parent.id);
    }
  }
};

export default resolvers