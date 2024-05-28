import {
  vroomController,
  vroomSlowController,
} from "@src/controllers/vroom.controller";
import { Router } from "express";

const vroomRouter = Router();

vroomRouter.get("/", vroomController);
vroomRouter.get("/slow", vroomSlowController);
export { vroomRouter };
