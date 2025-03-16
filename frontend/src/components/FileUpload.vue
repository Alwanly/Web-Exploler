<template>
  <div class="file-upload">
    <v-file-input
      v-model="selectedFile"
      label="Select File"
      prepend-icon="mdi-paperclip"
      accept="*"
      @change="handleFileInputChange"
      class="mb-4"
    ></v-file-input>

    <v-btn
      color="primary"
      :disabled="!selectedFile || !currentFolderId"
      @click="uploadFile"
      prepend-icon="mdi-upload"
    >
      Upload
    </v-btn>

    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      timeout="2000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VFileInput, VBtn, VSnackbar } from 'vuetify/components';

const emit = defineEmits<{
  (e: 'refresh', folderId: string): void
}>();

const props = defineProps<{
  currentFolderId: string | null
}>();

// Reactive state
const selectedFile = ref<File | null>(null);
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref(''); // Can be 'success' or 'error'

// Handle file input change
const handleFileInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

// Upload file
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
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    // Success feedback
    snackbarMessage.value = 'File uploaded successfully!';
    snackbarColor.value = 'success';
    emit('refresh', props.currentFolderId);
    selectedFile.value = null;
  } catch (error) {
    console.error('Upload error:', error);
    snackbarMessage.value = error instanceof Error ? error.message : 'Upload failed';
    snackbarColor.value = 'error';
  } finally {
    showSnackbar.value = true;
  }
};
</script>
