import { Request, Response } from "express";
import { Worker } from "worker_threads"; // Add this line
import path from "path";
import { cpuWorkerConfig } from "@configs/cpuWorkerConfig";

let { workerRunning, worker } = cpuWorkerConfig;
export const cpuWorkerController = (req: Request, res: Response) => {
  const workerPath = path.join(__dirname, "../workers/cpuIntensiveWorker");

  if (workerRunning) {
    res.status(400).send("Worker is already running");
    return;
  }
  workerRunning = true;
  worker = new Worker(workerPath);

  worker.on("message", async (message) => {
    workerRunning = false;
    console.log("Worker finished with result:", message);

  });

  // worker.on("error", (error) => {
  //   workerRunning = false;
  //   console.error("Worker error:", error);
  //   res.status(500).send(`Worker error: ${error.message}`);
  // });

  // worker.on("exit", (code) => {
  //   if (code !== 0) {
  //     console.error(`Worker stopped with exit code ${code}`);
  //     res.status(500).send(`Worker stopped with exit code ${code}`);
  //   }
  //   workerRunning = false;
  // });

  // console.log("Worker started");

  // console.log("Worker started");
  res.send("Worker started");
};
