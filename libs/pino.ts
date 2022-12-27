import pino from "pino";

const labels = pino().levels.labels;

export const pinoLogger = pino({
  level: "info",
  mixin: (_, level) => {
    return { severity: labels[level].toUpperCase() };
  },
});
