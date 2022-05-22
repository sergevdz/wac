import { boot } from 'quasar/wrappers'
import ContentPanel from 'src/components/global/ContentPanel.vue'

export default boot(({ app }) => {
  app.component('content-panel', ContentPanel)
})
