import { DB } from "@infrastructure/postgresql";
import { DataSource } from "typeorm";

export class ServiceProvider {
  private static _instance: ServiceProvider;

  private constructor() {} // Private constructor for singleton

  static get instance(): ServiceProvider {
    if (!ServiceProvider._instance) {
      ServiceProvider._instance = new ServiceProvider();
    }
    return ServiceProvider._instance;
  }

  get DB(): DataSource {
    return DB;
  }

  // Add other services/repositories here as needed
  // get userService() { ... }
}
