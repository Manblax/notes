import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bulma/css/bulma.min.css'
import VueFinalModal from 'vue-final-modal'

const app = createApp(App);

app.use(VueFinalModal(), {
    componentName: 'VueFinalModal',
    key: '$modal',
    dynamicContainerName: 'ModalsContainer'
});

app.use(router).mount('#app')
