import express from "express";
import { winstonLoggerErrorReport } from "./libs/winston";
import { bunyanLogger } from "./libs/bunyan";
import { pinoLogger } from "./libs/pino";
import { loglevelLogger } from "./libs/loglevel";

// https://cloud.google.com/error-reporting/docs/formatting-error-messages?hl=ja

console.error("this is test error");
console.log(
  JSON.stringify({
    severity: "ERROR",
    message: "This is testing a structured log error for GCP",
  })
);

const app = express();

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Start on port ${port} 🚀`);
});

app.get("/winston", (req, res) => {
  winstonLoggerErrorReport.info("winston: this is simple info string.");
  winstonLoggerErrorReport.info(new Error("winston: this is info instance"));
  winstonLoggerErrorReport.warn("winston: this is simple warn string.");
  winstonLoggerErrorReport.warn(new Error("winston: this is warn instance"));
  winstonLoggerErrorReport.error("winston: this is simple error string.");
  winstonLoggerErrorReport.error(new Error("winston: this is error instance"));

  res.send(JSON.stringify({ message: "winston" }));
});

app.get("/bunyan", (req, res) => {
  bunyanLogger.info("bunyan: this is simple info string.");
  bunyanLogger.info(new Error("bunyan: this is info instance"));
  bunyanLogger.warn("bunyan: this is simple warn string.");
  bunyanLogger.warn(new Error("bunyan: this is warn instance"));
  bunyanLogger.error("bunyan: this is simple error string.");
  bunyanLogger.error(new Error("bunyan: this is error instance"));

  res.send(JSON.stringify({ message: "bunyan" }));
});

app.get("/pino", (req, res) => {
  pinoLogger.info("pino: this is simple info string.");
  pinoLogger.info(new Error("pino: this is info instance"));
  pinoLogger.warn("pino: this is simple warn string.");
  pinoLogger.warn(new Error("pino: this is warn instance"));
  pinoLogger.error("pino: this is simple error string.");
  pinoLogger.error(new Error("pino: this is error instance"));

  res.send(JSON.stringify({ message: "pino" }));
});

app.get("/loglevel", (req, res) => {
  loglevelLogger.info("loglevel: this is simple info string.");
  loglevelLogger.info(new Error("loglevel: this is info instance"));
  loglevelLogger.warn("loglevel: this is simple warn string.");
  loglevelLogger.warn(new Error("loglevel: this is warn instance"));
  loglevelLogger.error("loglevel: this is simple error string.");
  loglevelLogger.error(new Error("loglevel: this is error instance"));

  res.send(JSON.stringify({ message: "loglevel" }));
});
app.get("/critical", (req, res) => {
  throw new Error("Critical error");
});
