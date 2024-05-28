import { getPromClient } from "@src/libs/prom";
import { Request, Response } from "express";
export const metricsController = async (req: Request, res: Response) => {
  const promClient = getPromClient();
  res.setHeader("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.send(metrics);
};
