<template>
  <div class="w-1/4 h-full bg-gray-200 p-4 overflow-y-auto">
    <ul>
      <li v-for="folder in folders" :key="folder.id" class="mb-2">
        <button @click="selectFolder(folder)" class="text-left w-full hover:bg-gray-300 p-2 rounded">
          {{ folder.name }}
        </button>
        <ul v-if="folder.children && folder.id === selectedFolderId" class="ml-4">
          <li v-for="child in folder.children" :key="child.id" class="mt-1">
            <button @click="selectFolder(child)" class="text-left">
              {{ child.name }}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';


defineProps({
  folders: { type: Array as PropType<Folder[]>, required: true }
});

// Define emit function for folder selection
const emit = defineEmits<{ (e: 'folderSelected', folder: Folder): void }>();

// selectFolder method
function selectFolder(folder: Folder) {
  emit('folderSelected', folder);
}
</script>