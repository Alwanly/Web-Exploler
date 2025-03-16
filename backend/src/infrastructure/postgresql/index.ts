import { DataSource } from "typeorm";
import { logger } from "@infrastructure";

import Config from "@config";
import { User } from "@domain/auth";
import { Folder } from "@domain/folder";
import { File } from "@domain/file";

const context = "PostgresSQL";
let DB: DataSource;

export async function initialize(): Promise<void> {
  const scope = initialize.name;

  DB = new DataSource({
    type: "postgres",
    host: Config.postgresql.host,
    port: Config.postgresql.port,
    username: Config.postgresql.username,
    password: Config.postgresql.password,
    database: Config.postgresql.database,
    synchronize: false,
    entities: [User, Folder, File],
    migrations: [],
    subscribers: [],
  });

  try {
    logger.info(context, "PostgreSQL connecting....", scope);
    await DB.initialize();
    logger.info(context, "PostgreSQL Connected", scope);
  } catch (error) {
    logger.error(context, "Error connecting to PostgreSQL", scope, error);
    throw error;
  }
}

export async function ping(): Promise<boolean> {
  const scope = ping.name;
  try {
    const queryRunner = DB.createQueryRunner();
    await queryRunner.connect();
    const result = await queryRunner.query("SELECT 1;");
    await queryRunner.release();
    return !!result;
  } catch (error) {
    logger.error(context, "Ping failed", scope, error);
    return false;
  }
}

export async function dispose(): Promise<void> {
  const scope = dispose.name;
  logger.info(context, "Disposing PostgreSQL...", scope);
  await DB.destroy();
}

export { DB };
