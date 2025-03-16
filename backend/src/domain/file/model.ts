import { Entity, Column, PrimaryColumn } from "typeorm";
import { v7 as uuid } from "uuid";

@Entity({ name: "files" })
export class File {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  folder_id!: string;

  @Column()
  created_at!: Date;

  constructor() {
    const date = new Date();
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.created_at) {
      this.created_at = date;
    }
  }
}
