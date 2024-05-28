import { getPromClient } from "@src/libs/prom";
import { NextFunction, Request, Response, Express } from "express";
import responseTime from "response-time";

const promClient = getPromClient();
const reqResTime = new promClient.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000],
});
const requestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const histogramMiddlewareCallback = (
  reqq: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  responseTime((req, res, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: getFullRoutePath(reqq),
        status_code: res.statusCode,
      })
      .observe(time);

    console.log(getFullRoutePath(reqq));
  })(reqq, res, next);

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    // Increment request counter
    requestCounter.inc({
      method: reqq.method,
      route: reqq.route ? reqq.route.path : reqq.path,
      status_code: res.statusCode,
    });
  });
  console.log("histogramMiddlewareCallback");
};

export const histogramMiddleware = async (_app: Express) => {
  _app.use(histogramMiddlewareCallback);
};

const getFullRoutePath = (req: Request) => {
  if (req.route) {
    const baseUrl = req.baseUrl || "";
    const path = req.route.path || "";
    return baseUrl + path;
  }
  return req.originalUrl; // Fallback to originalUrl if route is not available
};
