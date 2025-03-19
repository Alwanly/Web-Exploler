<template>
  <div class="flex h-screen">
    <Sidebar
      :folders="folders"
      @folderSelected="fetchContent"
      @folderCreated="handleCreate"
    />
    <MainContent
      :contents="contents"
      :folder="folder"
      @folderSelected="fetchContent"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Sidebar from "./components/organisms/Sidebar.vue";
import MainContent from "./components/organisms/MainContent.vue";
import { useFolderStore } from "./composables/useFolderStore";
import type { Files, Content } from "./model";

const folderStore = useFolderStore();
const { folders, contents, folder, handleCreate, fetchFolder, fetchContent } =
  folderStore;

onMounted(() => {
  fetchFolder();
});

function handleFileCreate(file: Files) {
  const content: Content = {
    id: file.id,
    name: file.name,
    type: "file",
  };
  contents.value.push(content);
}
</script>
