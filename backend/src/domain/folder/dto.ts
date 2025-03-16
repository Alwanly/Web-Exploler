import { Static, t } from "elysia";
import { BaseResponse } from "@infrastructure/wrapper";

export const CreateFolderRequestSchema = t.Object({
  id: t.MaybeEmpty(t.String()),
  name: t.String(),
});
export const CreateFolderResponseSchema = t.Object({
  id: t.Nullable(t.String()),
});

export type CreateFolderRequest = Static<typeof CreateFolderRequestSchema>;
export type CreateFolderResponse = Static<typeof CreateFolderResponseSchema>;
export type BaseCreateFolderResponse =
  BaseResponse<CreateFolderResponse | null>;

export const ListFolderRequestSchema = t.Object({});
export const ListFolderResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.Date(),
  isSubFolderExists: t.Boolean(),
});

export type ListFolderRequest = Static<typeof ListFolderRequestSchema>;
export type ListFolderResponse = Static<typeof ListFolderResponseSchema>;
export type BaseListFolderResponse =
  BaseResponse<Array<ListFolderResponse> | null>;

export const subFolderRequestSchema = t.Object({
  id: t.String(),
});

export type subFolderRequest = Static<typeof subFolderRequestSchema>;

export const ContentRequestSchema = t.Object({
  id: t.String(),
});
export const ContentResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.Date(),
  type: t.String(),
});

export type ContentRequest = Static<typeof ContentRequestSchema>;
export type ContentResponse = Static<typeof ContentResponseSchema>;
export type BaseContentResponse = BaseResponse<Array<ContentResponse> | null>;
