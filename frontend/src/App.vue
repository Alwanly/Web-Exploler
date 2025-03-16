<template>
  <div class="h-screen flex bg-gray-50">
    <!-- Left Panel - Folder Structure -->
    <div class="w-64 border-r border-gray-200 bg-white overflow-y-auto">
      <div class="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
        Folders
      </div>
      <FolderTree
        :folders="tree"
        @folder-click="loadChildren"
        class="px-2"
      />
    </div>

    <!-- Right Panel - Contents -->
    <div class="flex-1 overflow-y-auto p-6">
      <div class="max-w-4xl mx-auto">
        <!-- Content List -->
        <div class="space-y-2">
          <div
            v-for="content in contents"
            :key="content.type + '-' + content.id"
            class="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            :class="{
              'hover:bg-blue-50': content.type === 'folder',
              'cursor-pointer': content.type === 'folder'
            }"
            @click="content.type === 'folder' ? loadChildren(content.id) : null"
          >
            <span class="mr-3">
              <template v-if="content.type === 'folder'">
                📁
              </template>
              <template v-else>
                📄
              </template>
            </span>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-700">
                {{ content.name }}
              </p>
            </div>

            <span v-if="content.type === 'folder'" class="text-gray-400 text-sm">
              →
            </span>
          </div>

          <div
            v-if="contents.length === 0"
            class="text-center py-12 text-gray-500"
          >
            This folder is empty
          </div>
        </div>

        <!-- File Upload -->
        <FileUpload
          :current-folder-id="selectedFolderId"
          @refresh="loadChildren"
          class="mt-8 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-200 transition-colors"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FolderTree from './components/FolderTree.vue'
import FileUpload from './components/FileUpload.vue'

interface BaseResponse {
  success:boolean,
  message:string,
  data:any
}
interface Folder {
  id: string
  name: string
  parent_id: number | null
  children?: Folder[]
}

interface Content {
  id: string
  name: string
  createdAt :Date
  type :string
}

const tree = ref<Folder[]>([])
const contents=  ref<Content[]>([])
const selectedFolderId = ref<string | null>(null)

onMounted(async () => {
  const response = await fetch('http://localhost:9000/api/v1/folders')
  const resData: BaseResponse = await response.json()
  tree.value = buildTree(resData.data)
})

function buildTree(folders: Folder[]): Folder[] {
  const map: Record<string, Folder> = {}
  const tree: Folder[] = []
  folders.forEach((folder) => {
    map[folder.id] = { ...folder, children: [] }
  })
  folders.forEach((folder) => {
    const parent = folder.parent_id ? map[folder.parent_id] : null
    parent ? parent.children?.push(map[folder.id]) : tree.push(map[folder.id])
  })
  return tree
}

async function loadChildren(folderId: string) {
  selectedFolderId.value = folderId
  const response = await fetch(`http://localhost:9000/api/v1/folders/${folderId}/contents`)
  const resData:BaseResponse = await response.json()

  contents.value = resData.data
}

</script>

