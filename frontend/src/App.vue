<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
          <!-- Left Panel - Folder Tree -->
          <v-col cols="3" class="border-e">
            <v-list density="compact">
              <v-list-item class="text-caption font-weight-bold text-grey-darken-2">
                FOLDER STRUCTURE
              </v-list-item>
              <FolderTree :folders="tree" @folder-click="loadChildren" />
            </v-list>
          </v-col>

          <!-- Right Panel - Contents -->
          <v-col cols="6" class="pa-4">
            <v-container>
              <v-row v-if="contents.length > 0">
                <v-col v-for="content in contents" :key="'content-' + content.id" cols="12">
                  <v-card variant="outlined" class="pa-2" :class="{ 'clickable': content.type === 'folder' }"
                    @click="content.type === 'folder' ? loadChildren(content.id) : null">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon :icon="content.type === 'folder' ? 'mdi-folder' : 'mdi-file'"
                          :color="content.type === 'folder' ? 'blue' : 'grey-darken-1'"></v-icon>
                      </template>
                      <v-list-item-title>{{ content.name }}</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ formatDate(content.createdAt) }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Empty State -->
              <v-alert v-else type="info" variant="tonal" class="ma-4">
                This folder is empty
              </v-alert>

              <!-- File Upload -->
              <FileUpload :current-folder-id="selectedFolderId" @refresh="loadChildren" class="mt-4" />
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import FolderTree from './components/FolderTree.vue';
import FileUpload from './components/FileUpload.vue';


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
const selectedFolderId = ref<string | null>(null);

onMounted(async () => {
  const response = await fetch('http://localhost:9000/api/v1/folders');
  const resData: BaseResponse = await response.json();
  tree.value = resData.data
});


async function loadChildren(folderId: string) {
  selectedFolderId.value = folderId;

  try {
    const response = await fetch(`http://localhost:9000/api/v1/folders/${folderId}/contents`);
    const resData: BaseResponse = await response.json();

    contents.value = resData.data

    updateBreadcrumbs(folderId);
  } catch (error) {
    console.error('Failed to load contents:', error);
    contents.value = [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}


function updateBreadcrumbs(folderId: string) {
  // Implement your breadcrumb logic here
  // This should fetch hierarchy from API or maintain a path history
}
</script>

<style scoped>
.border-e {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
