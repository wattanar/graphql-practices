import { ApolloServer } from "apollo-server-express";
import express from "express";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import cookieParser from "cookie-parser"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./constants";
import { verify } from "jsonwebtoken"
import { createTokens } from "./auth";

const APP_PORT = process.env.PORT || 4000;

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req, res }: any) => ({ req, res })
});

const app = express();

app.use(cookieParser())

app.use(async (req: any, _, next) => {
  const refreshToken = req.cookies["x-refresh-token"] || null;
  const accessToken = req.cookies["x-access-token"] || null;

  if (!refreshToken && !accessToken) {
    return next();
  }

  if (accessToken) {
    try {
      const data: any = verify(accessToken, ACCESS_TOKEN_SECRET);
      req.userId = data.userId;
    } catch {}
  }
  
  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
  } catch {
    return next();
  }

  // const tokens = createTokens(user);

  // res.cookie("refresh-token", tokens.refreshToken);
  // res.cookie("access-token", tokens.accessToken);
  // req.userId = user.id;

  next();
});

server.applyMiddleware({ app });

app.listen(APP_PORT, () => {
  console.log(`Server is ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
})