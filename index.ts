import express from "express";
import { winstonLogger } from "./libs/winston";

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

  res.status(500).send(JSON.stringify({ message: "warn" }));
});

app.get("/critical", (req, res) => {
  throw new Error("Critical error");
});
