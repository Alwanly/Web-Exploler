import { Repository } from "./repository";
import {} from "@infrastructure";
import * as dto from "./dto";
import { wrapper } from "@infrastructure";
import { Folder } from "./model";

export class UseCase {
  private Repository: Repository;

  constructor(repository: Repository) {
    this.Repository = repository;
  }

  async folder(): Promise<dto.BaseListFolderResponse> {
    const data = await this.Repository.folder();
    return wrapper.success(200, data);
  }

  async subFolder(
    request: dto.subFolderRequest,
  ): Promise<dto.BaseListFolderResponse> {
    const data = await this.Repository.subFolder(request.id);

    return wrapper.success(200, data);
  }

  async create(
    request: dto.CreateFolderRequest,
  ): Promise<dto.BaseCreateFolderResponse> {
    console.table(request);
    const folder = new Folder();
    folder.name = request.name;
    if (request.id != null) {
      folder.parent_id = request.id;
    }
    let data = await this.Repository.create(folder);
    return wrapper.success(200, data);
  }

  async content(request: dto.ContentRequest): Promise<dto.BaseContentResponse> {
    const data = await this.Repository.content(request.id);
    return wrapper.success(200, data);
  }
}
