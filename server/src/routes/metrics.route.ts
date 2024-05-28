import { metricsController } from "@src/controllers/metrics.controller";
import { Router } from "express";

const metricsRouter = Router();

metricsRouter.get("/", metricsController);

export { metricsRouter };
