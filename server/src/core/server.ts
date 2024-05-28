require("module-alias/register");
var express = require("express");

import { Express } from "express";

import { InitializeRoutes } from "./initRoutes";

import { serverConfig } from "../configs/serverConfig";
import { InitializeMiddleWare } from "./initMiddleware";
import { initProm } from "@src/libs/prom";

export async function server() {
  let app: Express = express();

  let host = serverConfig.host;
  let port = serverConfig.port;

  initProm();
  const httpServer = app.listen(port, host, () => {
    console.log(`Server  started listening at ${host} on ${port} port ! `);
  });
  await InitializeRoutes.init(app);
  await InitializeMiddleWare.InitializeCommonMiddleware(app);

  return Promise.resolve(app);
}
