<!-- FolderTree.vue -->
<template>
  <v-list-item
    v-for="folder in folders"
    :key="folder.id"
    :value="folder.id"
    @click="$emit('folder-click', folder.id)"
  >
    <v-list-item-title>{{ folder.name }}</v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

interface Folder {
  id: string;
  name: string;
  isHasChildren: boolean;
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
