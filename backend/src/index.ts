// src/index.ts
import { configure } from "@config";
configure();
import { logger, postgresql } from "@infrastructure";
logger.initializeLogging();
import { ApplicationContext } from "@application";

const SHUTDOWN_TIMEOUT = 10_000; // 10 seconds
let server: ApplicationContext;

// Enhanced cleanup function
async function handleShutdown(): Promise<void> {
  const context = "ShutdownHandler";
  try {
    logger.info(context, "Starting graceful shutdown...", handleShutdown.name);

    // Step 1: Close HTTP server
    if (server) {
      await server.dispose();
    }

    // Step 2: Close database connection
    await postgresql.dispose();

    // Step 3: Add other cleanup tasks here (Redis, queues, etc.)

    logger.info(
      context,
      "Shutdown completed successfully",
      handleShutdown.name,
    );
  } catch (error) {
    logger.error(context, "Error during shutdown", handleShutdown.name, error);
  } finally {
    // Force exit if cleanup takes too long
    setTimeout(() => {
      logger.warn(
        context,
        "Forcing shutdown due to timeout",
        handleShutdown.name,
      );
      process.exit(1);
    }, SHUTDOWN_TIMEOUT).unref();
  }
}

// Enhanced signal handling
const signalTraps: Array<NodeJS.Signals> = ["SIGTERM", "SIGINT", "SIGQUIT"];
signalTraps.forEach((signal) => {
  process.on(signal, async () => {
    try {
      await handleShutdown();
      process.exit(0);
    } catch (error) {
      process.exit(1);
    }
  });
});

// Main application bootstrap
(async function main(): Promise<void> {
  const context = "Main";
  try {
    await postgresql.initialize();
    server = await ApplicationContext.create();
  } catch (error) {
    await handleShutdown();
    process.exit(1);
  }
})();
