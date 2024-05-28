import { Worker } from "worker_threads";
export interface CpuWorkerConfig {
  workerRunning: boolean;
  worker: Worker | null;
}

export const cpuWorkerConfig: CpuWorkerConfig = {
  workerRunning: false,
  worker: null,
};
