import { createApp } from 'vue'
import App from './App.vue'

import store from './Store'
//importing the tailwind css file form the css folder
import './css/index.css'
import router from './routes'





createApp(App).
use(store).use(router).mount('#app')
