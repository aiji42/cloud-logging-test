import pino from "pino";

export const pinoLogger = pino({
  level: "info",
});

const labels = pino().levels.labels;

export const pinoLoggerSeverity = pino({
  level: "info",
  messageKey: "message",
  mixin: (context, level) => {
    if (!("err" in context) && labels[level] === "error") {
      return {
        severity: labels[level].toUpperCase(),
        "@type":
          "type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent",
      };
    }

    return { severity: labels[level].toUpperCase() };
  },
});
