// worker.js
import { parentPort } from "worker_threads";

// parentPort?.on("message", () => {
//   const startTime = Date.now();
//   while (Date.now() - startTime < 4000) {
//     // Simulate CPU-intensive task
//     console.log("Working...");
//   }
//   parentPort?.postMessage("done");
// });

const heavyTask = () => {
  let arr = Array.from({ length: 102343240 }, () =>
    Math.floor(Math.random() * 400)
  );
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    sum += element;
  }
  return sum;
};

const result = heavyTask();

console.log(result);

parentPort?.postMessage(result);
