// src/application/context.ts
import { ServiceProvider } from "@infrastructure/services";
import { logger } from "@infrastructure";
import { FolderManagementController } from "@domain/folder/handler";
import Config from "@config";
import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import { FileManagementController } from "@domain/file/handler";

const context = "Application";
// src/application/context.ts
export class ApplicationContext {
  private static _instance: ApplicationContext;
  private _services: ServiceProvider;
  private _app: Elysia;

  private constructor() {
    this._services = ServiceProvider.instance;
    this._app = new Elysia();
  }

  static async create(): Promise<ApplicationContext> {
    const instance = new ApplicationContext();
    await instance.initialize();
    return instance;
  }

  private async initialize(): Promise<void> {
    await this.registerControllers();
  }

  private async registerControllers(): Promise<void> {
    // Core API structure
    this._app = new Elysia()
      // Global plugins
      .use(cors())
      // API versioning
      .group("/api", (api) =>
        api.group("/v1", (v1) =>
          v1.use(this.registerFeatureModules()).use(this.registerCoreModules()),
        ),
      )

      // Global error handling
      .onError(({ error }) => {
        logger.error(
          context,
          "Failed to initialize application",
          ApplicationContext.name,
          error,
        );
        return { error: "Internal server error" };
      });

    await this._app.listen(Config.port);
    logger.info(
      context,
      "Server started successfully on port " + Config.port,
      ApplicationContext.name,
    );
  }

  private registerFeatureModules(): Elysia {
    return new Elysia()
      .use(FolderManagementController(this._services))
      .use(FileManagementController(this._services));
  }

  private registerCoreModules(): Elysia {
    return new Elysia();
  }

  async dispose(): Promise<void> {
    logger.info(context, "Stop http", this.dispose.name);
    this._app.stop;
  }
}
