import knexConfig from "../knexfile";
import { authorLoader, postLoader } from "./loader";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";

const knex = require("knex")(knexConfig);

const resolvers = {
  Query: {
    post: async () => {
      return await knex("post").select("*");
    },
    author: async () => {
      return await knex("author").select("*");
    },
    user: async (_:any, __:any, { req }: any) => {
      if (!req.userId) {
        return null;
      }
      return await knex("user").select("*").first();
    }
  },
<<<<<<< HEAD
  Post: {
=======
  Mutation: {
    createPost: async (_ : any, { title, body, author } : any) => {
      const createdId = await knex("post").insert({ title, body, author });
      return { createdId, title, body, author };
    }
  },
  Post : {
>>>>>>> d09c3d860fdb44b0d30ea323cdd1adb678c37744
    author: async (parent: any, _: any, ctx: any) => {
      return authorLoader.load(parent.author);
    },
  },
  Author: {
    post: async (parent: any, _: any, ctx: any) => {
      return postLoader.load(parent.id);
    },
  },
  Mutation: {
    register: async (_: any, { username, password }: any) => {
      var uuid: string = uuidv4();

      await knex("user").insert({
        name: "test",
        password: "test",
        salt: uuid,
      });

      return true;
    },
    login: async (_: any, { username, password }: any, { res }: any) => {
      var user = await knex("user")
        .where("name", username)
        .where("password", password)
        .first();

      if (!user) {
        return null;
      }

      // const valid = await bcrypt.compare(password, user.password);
      // if (!valid) {
      //   return null;
      // }

      const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "10s",
      });

      res.cookie("x-refresh-token", refreshToken, { httpOnly: true });
      res.cookie("x-access-token", accessToken, { httpOnly: true });

      return user;
    },
    invalidateTokens: async (_: any, __: any, { req } : any) => {
      if (!req.userId) {
        return false;
      }

      // const user = await User.findOne(req.userId);
      // if (!user) {
      //   return false;
      // }
      // user.count += 1;
      // await user.save();

      // res.clearCookie('access-token')

      return true;
    }
  },
};

export default resolvers;
