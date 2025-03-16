import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { v7 as uuid } from "uuid";

@Entity({ name: "folders" })
export class Folder {
  @PrimaryColumn("uuid")
  id!: string; // UUID for unique folder identification

  @Column()
  name!: string;

  @ManyToOne(() => Folder, (folder) => folder.subFolders, { nullable: true })
  @JoinColumn({ name: "parent_id" }) // Explicitly map the foreign key column
  parent_id!: string | null; // Link to the parent folder entity

  @OneToMany(() => Folder, (folder) => folder.parent_id)
  subFolders!: Folder[]; // Link to subfolder entities

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date; // Automatically set the created_at timestamp

  isSubFolderExists!: boolean; // Virtual property, no need to save in the database

  constructor() {
    if (!this.id) {
      this.id = uuid(); // Automatically generate UUID for new folders
    }
    if (!this.created_at) {
      this.created_at = new Date(); // Automatically set current timestamp
    }
  }
}
