<!-- frontend/src/components/FileUpload.vue -->
<template>
  <div class="file-upload">
    <input type="file" @change="handleFileUpload" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Add emit definition 👇
const emit = defineEmits<{
  (e: 'refresh', folderId: string): void
}>();

const props = defineProps<{ currentFolderId: string | null }>();
const selectedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) {
    selectedFile.value = input.files[0];
  }
};

const uploadFile = async () => {
  if (!selectedFile.value || !props.currentFolderId) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('id', props.currentFolderId.toString());

  try {
    const response = await fetch(`http://localhost:9000/api/v1/files`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Clear file selection after upload
    selectedFile.value = null;
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';

    emit('refresh', props.currentFolderId);
  } catch (error) {
    console.error('Upload failed:', error);
    alert('File upload failed. Please try again.');
  }
};
</script>
