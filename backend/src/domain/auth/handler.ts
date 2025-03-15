import { DataSource } from "typeorm";
import { LoginUserRequestSchema, RegisterRequestSchema } from "./dto";
import { Repository } from "./repository";
import { UseCase } from "./usecase";
import Elysia, { t } from "elysia";

export const AuthController = (DB: DataSource) => {
  const repository = new Repository(DB);
  const usecase = new UseCase(repository);

  return new Elysia().group("/auth", (app) =>
    app
      .post(
        "/login",
        async ({ body, set }) => {
          const { statusCode, ...response } = await usecase.login(body);
          set.status = statusCode;
          return response;
        },
        {
          body: LoginUserRequestSchema,
        },
      )
      .post(
        "/register",
        async ({ body, set }) => {
          const { statusCode, ...response } = await usecase.register(body);
          set.status = statusCode;
          return response;
        },
        {
          body: RegisterRequestSchema,
        },
      ),
  );
};
