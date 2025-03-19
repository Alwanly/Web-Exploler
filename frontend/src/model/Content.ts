export interface Content {
  id: string;
  name: string;
  type?: "folder" | "file";
  createdAt?: string;
  file?: File;
}
