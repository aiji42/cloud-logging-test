import pino from "pino";

export const pinoLogger = pino({
  level: "info",
});

const labels = pino().levels.labels;

export const pinoLoggerSeverity = pino({
  level: "info",
  mixin: (_, level) => {
    return { severity: labels[level].toUpperCase() };
  },
});
