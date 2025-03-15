import { DataSource } from "typeorm";
import { User } from "./model";

export class Repository {
  private userRepo;
  constructor(DB: DataSource) {
    if (!DB.isInitialized) {
      throw new Error("Database not initialized. Call initialize() first.");
    }
    this.userRepo = DB.getRepository(User);
  }

  async login(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  async register(user: User): Promise<User | null> {
    return this.userRepo.save(user);
  }
}
