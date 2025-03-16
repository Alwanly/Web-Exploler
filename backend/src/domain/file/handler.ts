import { CreateFileRequestSchema } from "./dto";
import { Repository } from "./repository";
import { UseCase } from "./usecase";
import Elysia from "elysia";
import { ServiceProvider } from "@infrastructure/services";

export const FileManagementController = (service: ServiceProvider) => {
  const repository = new Repository(service.DB);
  const usecase = new UseCase(repository);

  return new Elysia().group("/file", (app) =>
    app.post(
      "",
      async ({ body, set }) => {
        const { statusCode, ...response } = await usecase.create(body);
        set.status = statusCode;
        return response;
      },
      {
        body: CreateFileRequestSchema,
      },
    ),
  );
};
