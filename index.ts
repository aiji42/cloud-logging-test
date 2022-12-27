import express from "express";
import { winstonLogger } from "./libs/winston";
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

app.get("/winston/info", (req, res) => {
  winstonLogger.info("this is simple info string.");
  winstonLogger.info({ message: "this is info object" });
  winstonLogger.info(new Error("this is info instance"));

  res.send(JSON.stringify({ message: "info" }));
});

app.get("/winston/warn", (req, res) => {
  winstonLogger.warn("this is simple warn string.");
  winstonLogger.warn({ message: "this is warn object" });
  winstonLogger.warn(new Error("this is warn instance"));

  res.send(JSON.stringify({ message: "warn" }));
});

app.get("/winston/error", (req, res) => {
  winstonLogger.error("this is simple error string.");
  winstonLogger.error({ message: "this is error object" });
  winstonLogger.error(new Error("this is error instance"));

  res.status(500).send(JSON.stringify({ message: "error" }));
});

app.get("/bunyan/info", (req, res) => {
  bunyanLogger.info("this is simple info string.");
  bunyanLogger.info({ message: "this is info object" });
  bunyanLogger.info(new Error("this is info instance"));

  res.send(JSON.stringify({ message: "info" }));
});

app.get("/bunyan/warn", (req, res) => {
  bunyanLogger.warn("this is simple warn string.");
  bunyanLogger.warn({ message: "this is warn object" });
  bunyanLogger.warn(new Error("this is warn instance"));

  res.send(JSON.stringify({ message: "warn" }));
});

app.get("/bunyan/error", (req, res) => {
  bunyanLogger.error("this is simple error string.");
  bunyanLogger.error({ message: "this is error object" });
  bunyanLogger.error(new Error("this is error instance"));

  res.status(500).send(JSON.stringify({ message: "error" }));
});

app.get("/pino/info", (req, res) => {
  pinoLogger.info("this is simple info string.");
  pinoLogger.info({ message: "this is info object" });
  pinoLogger.info(new Error("this is info instance"));

  res.send(JSON.stringify({ message: "info" }));
});

app.get("/pino/warn", (req, res) => {
  pinoLogger.warn("this is simple warn string.");
  pinoLogger.warn({ message: "this is warn object" });
  pinoLogger.warn(new Error("this is warn instance"));

  res.send(JSON.stringify({ message: "warn" }));
});

app.get("/pino/error", (req, res) => {
  pinoLogger.error("this is simple error string.");
  pinoLogger.error({ message: "this is error object" });
  pinoLogger.error(new Error("this is error instance"));

  res.status(500).send(JSON.stringify({ message: "error" }));
});

app.get("/loglevel/info", (req, res) => {
  loglevelLogger.info("this is simple info string.");
  loglevelLogger.info({ message: "this is info object" });
  loglevelLogger.info(new Error("this is info instance"));

  res.send(JSON.stringify({ message: "info" }));
});

app.get("/loglevel/warn", (req, res) => {
  loglevelLogger.warn("this is simple warn string.");
  loglevelLogger.warn({ message: "this is warn object" });
  loglevelLogger.warn(new Error("this is warn instance"));

  res.send(JSON.stringify({ message: "warn" }));
});

app.get("/loglevel/error", (req, res) => {
  loglevelLogger.error("this is simple error string.");
  loglevelLogger.error({ message: "this is error object" });
  loglevelLogger.error(new Error("this is error instance"));

  res.status(500).send(JSON.stringify({ message: "error" }));
});

app.get("/critical", (req, res) => {
  throw new Error("Critical error");
});
