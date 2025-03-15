import { date } from "joiful";
import { Entity, Column, PrimaryColumn } from "typeorm";
import { v7 as uuid } from "uuid";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;

  constructor() {
    const date = new Date();
    if (!this.id) {
      this.id = uuid();
    }

    if (!this.created_at) {
      this.created_at = date;
    }
    if (!this.updated_at) {
      this.updated_at = date;
    }
  }
}
