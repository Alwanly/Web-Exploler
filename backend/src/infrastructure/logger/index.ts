import winston from "winston";
import { format } from "winston";
import ecsFormat from "@elastic/ecs-winston-format";

import Config from "@config";

const context = "Components.Logger";

export const logger = winston.createLogger({
  exitOnError: false,
  silent: Config.env === "test",
  level: Config.logLevel,
  format: format.combine(format.splat(), format.simple()),
  defaultMeta: {
    service_name: Config.serviceName,
  },
});

export function initializeLogging(): void {
  const scope = initializeLogging.name;

  // clear all transports
  logger.clear();

  // add console transport
  logger.add(new winston.transports.Console());
  info(context, "Logging to console transport initialized", scope);
}

export function sanitizeData(data?: unknown): string {
  // if data is undefined, null, or empty string, return empty string
  if (!data) {
    return "";
  }

  // if it's already a string, return it
  if (typeof data === "string") {
    return data;
  }

  // if the data is an Error, log the message and stack trace
  if (data instanceof Error) {
    return JSON.stringify({ message: data.message, stack: data.stack });
  }

  // stringify anything
  return JSON.stringify(data);
}

export function error(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.error(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}

export function warn(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.warn(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}

export function info(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.info(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}

export function http(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.http(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}

export function verbose(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.verbose(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}

export function debug(
  context: string,
  message: string,
  scope: string,
  data?: unknown,
): void {
  logger.debug(message, {
    context,
    scope,
    data: sanitizeData(data),
  });
}
