import knexConfig from "../knexfile";
import { authorLoader, postLoader } from "./loader";

const knex = require("knex")(knexConfig.development);

const resolvers = {
  Query: {
    post: async () => {
      return await knex("post").select("*")
    },
    author: async () => {
      return await knex("author").select("*")
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