import http from "http";
import express, { Request, Response } from "express";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import { todoServiceHandler } from "./handlers/todo";
import { Interceptor } from "@connectrpc/connect";
import cors from 'cors'

const app = express();

app.use(cors())

const logger: Interceptor = (next) => async (req) => {
  console.log(`received message on ${req.url}`);
  return await next(req);
};

app.use(expressConnectMiddleware({
  interceptors: [logger],
  routes(router) {
    todoServiceHandler(router)
  },
}));

app.get("/", (_: Request, res: Response) => {
  res.status(200).send('Hello World')
}) 

http.createServer(app).listen(8080);
console.log(`server running on :8080`)