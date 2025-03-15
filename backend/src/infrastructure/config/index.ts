import { password } from "bun";
import dotenv from "dotenv";
dotenv.config();

const config = {
  // load custom config
  env: process.env.NODE_ENV ?? "development",
  debug: process.env.DEBUG === "true",
  port: parseInt(process.env.PORT ?? "9000"),
  logLevel: process.env.LOG_LEVEL ?? "debug",
  serviceName: process.env.SERVICE_NAME ?? "backend-web-explorer",
  postgresql: {
    uri: process.env.POSTGRES_URI ?? "",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "postgres",
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME ?? "admin",
    password: process.env.BASIC_AUTH_PASSWORD ?? "admin",
  },
  jwtAuth: {
    secret: process.env.JWT_AUTH_SECRET ?? "admin",
  },
};

export function configure() {
  // check mongodb
  if (!config.postgresql.uri) {
    throw new Error("MONGODB_URI are required");
  }

  const postgresUrl = new URL(config.postgresql.uri);
  config.postgresql = {
    uri: config.postgresql.uri,
    host: postgresUrl.hostname,
    port: parseInt(postgresUrl.port),
    username: postgresUrl.username,
    password: postgresUrl.password,
    database: postgresUrl.pathname.slice(1), // remove leading '/'
  };
}

export default config;
