import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labs,
  },
})

createApp(App).use(vuetify).mount('#app')
