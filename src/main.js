import { createApp } from 'vue'
import App from './App.vue'

//importing the tailwind css file form the css folder
import './css/index.css'


import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      width: 0,
      isActive: false,
    }
  },
  mutations: {
    showProgressBar (state) {
      state.isActive=true;
      this.commit('IncrementWidth');
      

    },
    hideProgressBar (state) {
    
            state.isActive=false
    
    },
    IncrementWidth (state) {
        
        while(state.width<100){
            state.width=state.width+25;
        }
           
        
  }
}
})

createApp(App).use(store).mount('#app')
