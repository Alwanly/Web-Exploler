import { Static, t } from "elysia";
import { BaseResponse } from "@infrastructure/wrapper";

export const CreateFileRequestSchema = t.Object({
  id: t.String(),
  file: t.File({ format: "*" }),
});
export const CreateFileResponseSchema = t.Object({
  id: t.Nullable(t.String()),
});

export type CreateFileRequest = Static<typeof CreateFileRequestSchema>;
export type CreateFileResponse = Static<typeof CreateFileResponseSchema>;
export type BaseCreateFileResponse = BaseResponse<CreateFileResponse | null>;
