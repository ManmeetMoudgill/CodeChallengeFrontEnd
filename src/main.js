import { createApp } from 'vue'
import App from './App.vue'

import store from './Store'
//importing the tailwind css file form the css folder
import './css/index.css'
import router from './routes'


import { library } from '@fortawesome/fontawesome-svg-core'

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faArrowLeft)

createApp(App).
component('fa', FontAwesomeIcon).
use(store).use(router).mount('#app')
