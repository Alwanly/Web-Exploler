import { ref } from "vue";
import type { Folder, BaseResponse, Content } from "@/model";

export function useFolderStore() {
  const folders = ref<Folder[]>([]);
  const contents = ref<Content[]>([]);
  const folder = ref<Folder | Content>();

  async function fetchFolder() {
    const response = await fetch("http://localhost:9000/api/v1/folders");
    const resData: BaseResponse = await response.json();
    folders.value = resData.data;
  }
  async function fetchContent(data: Content | Folder) {
    console.log("fetchContent", folder);
    folder.value = data;
    const folderId = folder.value.id;
    try {
      const response = await fetch(
        `http://localhost:9000/api/v1/folders/${folderId}/contents`,
      );
      const resData: BaseResponse = await response.json();
      contents.value = resData.data;
      console.log("contents", contents.value);
    } catch (error) {
      console.error("Failed to load contents:", error);
      contents.value = [];
    }
  }

  async function createFolder(name: string, id: string) {
    const response = await fetch("http://localhost:9000/api/v1/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, id }),
    });
    const resData: BaseResponse = await response.json();
    return resData.data;
  }

  async function createFile(id: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    const response = await fetch("http://localhost:9000/api/v1/files", {
      method: "POST",
      body: formData,
    });
    const resData: BaseResponse = await response.json();
    return resData.data;
  }

  function handleCreate(folder: Folder) {
    folders.value.push(folder);
  }

  return {
    folders,
    contents,
    folder,
    fetchFolder,
    fetchContent,
    createFolder,
    createFile,
    handleCreate,
  };
}
