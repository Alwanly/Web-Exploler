<template>
  <div class="flex-1 bg-white p-4">
    <div class="grid grid-cols-2 gap-4" v-if="folder">
      <button
        @click="showUploadFileModal = true"
        class="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
      >
        + Upload File
      </button>
      <button
        @click="showCreateFolderModal = true"
        class="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
      >
        + Create Folder
      </button>
    </div>

    <h2 class="text-xl font-bold mb-4">
      {{ folder?.name || "Select a folder" }}
    </h2>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="item in contents"
        :key="item.id"
        class="p-4 rounded shadow hover:shadow-md"
      >
        <div
          v-if="item.type === 'folder'"
          class="text-blue-500"
          @click="selectFolder(item)"
        >
          📁 {{ item.name }}
        </div>
        <div v-else class="text-gray-700"> 📄 {{ item.name }} </div>
      </div>
    </div>
    <!-- Upload File Modal -->
    <div
      v-if="showUploadFileModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 rounded shadow w-1/3">
        <h3 class="text-lg font-bold mb-2">Upload File</h3>
        <input
          @change="handleFileChange"
          type="file"
          placeholder="Enter folder name"
          class="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            @click="handleFileCreate()"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showCreateFolderModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 rounded shadow w-1/3">
        <h3 class="text-lg font-bold mb-2">Create New Folder</h3>
        <input
          v-model="newFolder"
          type="text"
          placeholder="Enter folder name"
          class="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            @click="handleFolderCreate()"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import { defineProps, defineEmits } from "vue";
import type { Content, Folder, Files } from "@/model";
import { useFolderStore } from "@/composables/useFolderStore";

const folderStore = useFolderStore();
const { createFile, createFolder } = folderStore;

// Define the props for the component
const pros = defineProps({
  contents: { type: Array as PropType<Content[]>, required: true },
  folder: Object as PropType<Folder | null>,
});

// Emit the folderSelected event to the parent
const emit = defineEmits<{
  (e: "folderSelected", folder: Content): void;
}>();

// Local state
const showUploadFileModal = ref(false);
const newFile = ref<File | null>(null);
const showCreateFolderModal = ref(false);
const newFolder = ref("");

function selectFolder(folder: Content) {
  // Emit the event only if the item is a folder
  if (folder.type === "folder") {
    emit("folderSelected", folder);
  }
}

function closeModal() {
  showUploadFileModal.value = false;
  newFile.value = null;
  showCreateFolderModal.value = false;
  newFolder.value = "";
}

function handleFileChange(event: Event) {
  newFile.value = (event.target as HTMLInputElement).files![0];
}
async function handleFileCreate() {
  if (newFile.value) {
    const file = await createFile(pros.folder!.id, newFile.value);
    const content: Content = {
      id: file.id,
      name: file.name,
      type: "file",
      createdAt: file.created_at,
    };
    pros.contents.push(content);
    closeModal();
  }
}
async function handleFolderCreate() {
  if (newFolder.value.trim()) {
    const folder = await createFolder(newFolder.value, pros.folder!.id);
    const content: Content = {
      id: folder.id,
      name: folder.name,
      type: "folder",
      createdAt: folder.created_at,
    };
    pros.contents.push(content);
    closeModal();
  }
}
</script>
