import { DataSource } from "typeorm";
import { File } from "./model";

export class Repository {
  private fileRepo;
  constructor(DB: DataSource) {
    if (!DB.isInitialized) {
      throw new Error("Database not initialized. Call initialize() first.");
    }
    this.fileRepo = DB.getRepository(File);
  }

  async create(file: File): Promise<File> {
    return this.fileRepo.save(file);
  }
}
