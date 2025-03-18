<template>
  <div class="flex-1 bg-white p-4">
    <h2 class="text-xl font-bold mb-4">
      {{ folderName || "Select a folder" }}
    </h2>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="item in contents" :key="item.id" class="border p-4 rounded shadow hover:shadow-md">
        <div v-if="item.type === 'folder'" class="text-blue-500" @click="selectFolder(item)">
          📁 {{ item.name }}
        </div>
        <div v-else class="text-gray-700">
          📄 {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { PropType } from 'vue';

interface Content {
  id: string;
  name: string;
  type: 'folder' | 'file';
}

defineProps({
  contents: { type: Array as PropType<Content[]>, required: true },
  folderName: String
});

// Emit the folderSelected event to the parent
const emit = defineEmits<{ (e: 'folderSelected', folder: Content): void }>();

// Method to handle folder selection
function selectFolder(folder: Content) {
  // Emit the event only if the item is a folder
  if (folder.type === 'folder') {
    emit('folderSelected', folder);
  }
}

</script>