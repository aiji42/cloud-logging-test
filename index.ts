import express from "express";
import { winstonLogger, winstonLoggerErrorReport } from "./libs/winston";
import { bunyanLogger } from "./libs/bunyan";
import { pinoLogger, pinoLoggerSeverity } from "./libs/pino";
import { loglevelLogger } from "./libs/loglevel";
import { consoleLogger } from "./libs/console";

// https://cloud.google.com/error-reporting/docs/formatting-error-messages?hl=ja

const app = express();

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Start on port ${port} 🚀`);
});

app.get("/console", (req, res) => {
  console.log("console: this is simple info string.");
  console.log(new Error("console: this is info instance"));
  console.warn("console: this is simple warn string.");
  console.warn(new Error("console: this is warn instance"));
  console.error("console: this is simple error string.");
  console.error(new Error("console: this is error instance"));

  res.send(JSON.stringify({ message: "console" }));
});

app.get("/console/custom", (req, res) => {
  consoleLogger.info("console: this is simple info string.");
  consoleLogger.info(new Error("console: this is info instance"));
  consoleLogger.warn("console: this is simple warn string.");
  consoleLogger.warn(new Error("console: this is warn instance"));
  consoleLogger.error("console: this is simple error string.");
  consoleLogger.error(new Error("console: this is error instance"));

  res.send(JSON.stringify({ message: "console" }));
});

app.get("/winston", (req, res) => {
  winstonLogger.info("winston: this is simple info string.");
  winstonLogger.info(new Error("winston: this is info instance"));
  winstonLogger.warn("winston: this is simple warn string.");
  winstonLogger.warn(new Error("winston: this is warn instance"));
  winstonLogger.error("winston: this is simple error string.");
  winstonLogger.error(new Error("winston: this is error instance"));

  res.send(JSON.stringify({ message: "winston" }));
});

app.get("/winston/custom", (req, res) => {
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

app.get("/pino/custom", (req, res) => {
  pinoLoggerSeverity.info("pino: this is simple info string.");
  pinoLoggerSeverity.info(new Error("pino: this is info instance"));
  pinoLoggerSeverity.warn("pino: this is simple warn string.");
  pinoLoggerSeverity.warn(new Error("pino: this is warn instance"));
  pinoLoggerSeverity.error("pino: this is simple error string.");
  pinoLoggerSeverity.error(new Error("pino: this is error instance"));

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
