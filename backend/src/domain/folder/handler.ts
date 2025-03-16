import { DataSource } from "typeorm";
import {
  ContentRequestSchema,
  CreateFolderRequestSchema,
  subFolderRequestSchema,
} from "./dto";
import { Repository } from "./repository";
import { UseCase } from "./usecase";
import Elysia from "elysia";
import { ServiceProvider } from "@infrastructure/services";

export const FolderManagementController = (service: ServiceProvider) => {
  const repository = new Repository(service.DB);
  const usecase = new UseCase(repository);

  return new Elysia().group("/folder", (app) =>
    app
      .post(
        "",
        async ({ body, set }) => {
          const { statusCode, ...response } = await usecase.create(body);
          set.status = statusCode;
          return response;
        },
        {
          body: CreateFolderRequestSchema,
        },
      )
      .get("", async ({ set }) => {
        const { statusCode, ...response } = await usecase.folder();
        set.status = statusCode;
        return response;
      })
      .get(
        "/:id",
        async ({ params, set }) => {
          const { statusCode, ...response } = await usecase.subFolder(params);
          set.status = statusCode;
          return response;
        },
        {
          params: subFolderRequestSchema,
        },
      )
      .get(
        "/:id/content",
        async ({ params, set }) => {
          const { statusCode, ...response } = await usecase.content(params);
          set.status = statusCode;
          return response;
        },
        {
          params: ContentRequestSchema,
        },
      ),
  );
};
