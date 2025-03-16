import { Repository } from "./repository";
import {} from "@infrastructure";
import * as dto from "./dto";
import { wrapper } from "@infrastructure";
import { File } from "./model";

export class UseCase {
  private Repository: Repository;

  constructor(repository: Repository) {
    this.Repository = repository;
  }

  async create(
    request: dto.CreateFileRequest,
  ): Promise<dto.BaseCreateFileResponse> {
    const file = new File();
    file.folder_id = request.id;
    file.name = request.file.name;

    let data = await this.Repository.create(file);
    return wrapper.success(200, data);
  }
}
