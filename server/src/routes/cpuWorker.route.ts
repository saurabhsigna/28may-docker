import { cpuWorkerController } from "@src/controllers/cpuWorker.controller";
import { Router } from "express";

const cpuWorkerRouter = Router();

cpuWorkerRouter.get("/", cpuWorkerController);

export { cpuWorkerRouter };
