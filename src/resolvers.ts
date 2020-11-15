import knexConfig from "../knexfile";

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
      return await ctx.authorLoader.load(parent.author);
    }
  },
  Author: {
    post: async (parent: any, _: any, ctx: any) => {
      return await ctx.postLoader.load(parent.id);
    }
  }
};

export default resolvers