import express from "express";
import { helloworldRouter } from "./helloworld.route";
import { cpuWorkerRouter } from "./cpuWorker.route";
import { metricsRouter } from "./metrics.route";
import { vroomRouter } from "./vroom.route";

const router = express.Router();

router.use("/", helloworldRouter);
router.use("/worker", cpuWorkerRouter);
router.use("/metrics", metricsRouter);
router.use("/vroom", vroomRouter);
export { router };
