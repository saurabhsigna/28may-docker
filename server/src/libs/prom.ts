import promClient from "prom-client";

export const initProm = () => {
  // Initialize prom-client
  const collectDefaultMetrics = promClient.collectDefaultMetrics;
  collectDefaultMetrics({ register: promClient.register }); // Pass the registry instance to collectDefaultMetrics
  console.log("Prometheus metrics initialized");
};

export const getPromClient = () => {
  return promClient;
};
