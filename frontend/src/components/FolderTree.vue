<!-- frontend/src/components/FolderTree.vue -->
<template>
  <ul>
    <li v-for="folder in folders" :key="folder.id">
      <div class="folder" @click="$emit('folder-click', folder.id)">
        {{ folder.name }}
      </div>
      <FolderTree
        v-if="folder.children?.length"
        :folders="folder.children"
        @folder-click="$emit('folder-click', $event)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface Folder {
  id: string;
  name: string;
  parent_id: number | null;
  children?: Folder[];
}

defineProps({
  folders: { type: Array as PropType<Folder[]>, required: true }
});

defineEmits<{ (e: 'folder-click', id: string): void }>();
</script>

<style scoped>
ul { list-style: none; padding-left: 16px; }
li { margin: 4px 0; }
.folder { cursor: pointer; padding: 4px; }
.folder:hover { background: #f0f0f0; }
</style>
