<template>
  <div class="flex h-screen">
    <Sidebar :folders="tree" @folderSelected="loadChildren" />
    <MainContent :contents="contents" :folderName="folderName" @folderSelected="loadChildren" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Sidebar from "./components/Sidebar.vue";
import MainContent from "./components/MainContent.vue";


interface BaseResponse {
  success: boolean
  message: string
  data: any
}
interface Folder {
  id: string;
  name: string;
  isHasChildren: boolean
}
interface Content {
  id: string;
  name: string;
  type: 'folder' | 'file';
  createdAt: string;
}

const tree = ref<Folder[]>([]);
const contents = ref<Content[]>([]);
const folderName = ref<Folder | null>(null);

onMounted(async () => {
  const response = await fetch('http://localhost:9000/api/v1/folders');
  const resData: BaseResponse = await response.json();
  tree.value = resData.data
});

async function loadChildren(folder: Folder) {
  const folderId = folder.id;
  folderName.value = folder.name;
  try {
    const response = await fetch(`http://localhost:9000/api/v1/folders/${folderId}/contents`);
    const resData: BaseResponse = await response.json();
    contents.value = resData.data
  } catch (error) {
    console.error('Failed to load contents:', error);
    contents.value = [];
  }
}

</script>
