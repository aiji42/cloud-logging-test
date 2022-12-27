import bunyan from "bunyan";

export const bunyanLogger = bunyan.createLogger({
  name: "cloud-logging-test",
  level: "info",
});
