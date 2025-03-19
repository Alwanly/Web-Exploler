<template>
  <!-- Collapsible Sidebar -->
  <div
    :class="[
      isCollapsed ? 'w-16' : 'w-1/4',
      'h-full bg-gray-200 overflow-y-auto transition-width duration-300 p-2',
    ]"
  >
    <!-- Sidebar Header -->
    <div class="flex items-center justify-between mb-4">
      <span v-if="!isCollapsed" class="font-bold text-lg">Folders</span>
      <button
        @click="toggleSidebar"
        class="bg-gray-300 p-2 rounded hover:bg-gray-400"
      >
        {{ isCollapsed ? "➡️" : "⬅️" }}
      </button>
    </div>

    <!-- Create Folder Button -->
    <button
      v-if="!isCollapsed"
      @click="showCreateFolderModal = true"
      class="w-full bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
    >
      + Create Folder
    </button>

    <!-- Folder List -->
    <ul>
      <li
        v-for="folder in folders"
        :key="folder.id"
        class="flex items-center mb-2"
      >
        <!-- Folder Icon -->
        <span class="text-blue-500 mr-2">📁</span>

        <!-- Folder Name -->
        <button
          @click="selectFolder(folder)"
          class="text-left w-full hover:bg-gray-300 p-2 rounded"
          :class="{ 'pl-4': isCollapsed }"
        >
          {{ isCollapsed ? "" : folder.name }}
        </button>
      </li>
    </ul>

    <!-- Create Folder Modal -->
    <div
      v-if="showCreateFolderModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-4 rounded shadow w-1/3">
        <h3 class="text-lg font-bold mb-2">Create New Folder</h3>
        <input
          v-model="newFolderName"
          type="text"
          placeholder="Enter folder name"
          class="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div class="flex justify-end">
          <button
            @click="closeCreateFolderModal"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            @click="createFolder"
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
import type { Folder, Content } from "@/model";

defineProps({
  folders: { type: Array as PropType<Folder[]>, required: true },
});

// Emit Events
const emit = defineEmits<{
  (e: "folderSelected", folder: Folder): void;
  (e: "folderCreated", folder: Folder): void;
}>();

// Sidebar State
const isCollapsed = ref(false);
const showCreateFolderModal = ref(false);
const newFolderName = ref("");

// Methods
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value;
}

function selectFolder(folder: Content) {
  console.log("Folder Selected:", folder);
  emit("folderSelected", folder);
}

function closeCreateFolderModal() {
  showCreateFolderModal.value = false;
  newFolderName.value = "";
}

async function createFolder() {
  if (newFolderName.value.trim()) {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/folders`, {
        method: "POST",
        body: JSON.stringify({ name: newFolderName.value, id: null }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();

      emit("folderCreated", {
        id: resData.data.id,
        name: newFolderName.value,
        isHasChildren: false,
      });
    } catch (error) {
      console.error("Failed to load contents:", error);
    } finally {
      closeCreateFolderModal();
    }
  }
}
</script>

<style scoped>
/* You can add custom styles here if needed. */
</style>
