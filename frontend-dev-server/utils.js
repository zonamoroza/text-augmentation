import pino from "pino";
import { config } from "./config.js";

export const logger = pino({
  level: config.logLevel,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});