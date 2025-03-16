import { DataSource, IsNull } from "typeorm";
import { Folder } from "./model";
import { ContentResponse, ListFolderResponse } from "./dto";
import { File } from "@domain/file";

export class Repository {
  private folderRepo;
  private fileRepo;
  constructor(DB: DataSource) {
    if (!DB.isInitialized) {
      throw new Error("Database not initialized. Call initialize() first.");
    }
    this.folderRepo = DB.getRepository(Folder);
    this.fileRepo = DB.getRepository(File);
  }

  async folder(): Promise<Array<ListFolderResponse>> {
    const folders = await this.folderRepo
      .createQueryBuilder("folder")
      .leftJoinAndSelect(
        "folder.subFolders",
        "subFolder",
        "subFolder.parent_id = folder.id",
      )
      .where({ parent_id: IsNull() })
      .select([
        "folder.id",
        "folder.name",
        "folder.created_at as created_at",
        "COUNT(subFolder.id) > 0 as is_sub",
      ])
      .groupBy("folder.id") // Group results by folder to avoid duplicates
      .getRawMany();
    return folders.map((folder) => ({
      id: folder.folder_id,
      name: folder.folder_name,
      createdAt: folder.created_at,
      isSubFolderExists: folder.is_sub,
    }));
  }

  async subFolder(parent_id: string): Promise<Array<ListFolderResponse>> {
    const folders = await this.folderRepo
      .createQueryBuilder("folder")
      .leftJoinAndSelect(
        "folder.subFolders",
        "subFolder",
        "subFolder.parent_id = folder.id",
      )
      .where({ parent_id })
      .select([
        "folder.id",
        "folder.name",
        "folder.created_at as created_at",
        "COUNT(subFolder.id) > 0 as is_sub",
      ])
      .groupBy("folder.id") // Group results by folder to avoid duplicates
      .getRawMany();
    return folders.map((folder) => ({
      id: folder.folder_id,
      name: folder.folder_name,
      createdAt: folder.created_at,
      isSubFolderExists: folder.is_sub,
    }));
  }
  async create(folder: Folder): Promise<Folder> {
    return this.folderRepo.save(folder);
  }

  async content(folder_id: string): Promise<Array<ContentResponse>> {
    // Get subfolders and files in parallel
    const [subFolders, files] = await Promise.all([
      // Get subfolders
      this.folderRepo
        .createQueryBuilder("folder")
        .select([
          "folder.id as id",
          "folder.name as name",
          'folder.created_at as "createdAt"',
        ])
        .where({ parent_id: folder_id })
        .getRawMany(),

      // Get files
      this.fileRepo
        .createQueryBuilder("file")
        .select([
          "file.id as id",
          "file.name as name",
          'file.created_at as "createdAt"',
        ])
        .where({ folder_id: folder_id })
        .getRawMany(),
    ]);

    // Combine and map results
    return [
      ...subFolders.map((folder) => ({
        ...folder,
        type: "folder" as const,
      })),
      ...files.map((file) => ({
        ...file,
        type: "file" as const,
      })),
    ];
  }
}
