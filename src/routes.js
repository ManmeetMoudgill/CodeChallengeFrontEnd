// 1. Define route components.
// These can be imported from other files

import {createRouter, createWebHistory}  from 'vue-router'
import Home from './view/Home.vue'
import SingleNews from './components/SingleNews.vue'
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name:"Home",component: Home },
  { path: '/news/:name/:author',name:"SingleNews",component: SingleNews },
  {path: '/:pathMatch(.*)*', name: 'not-found',redirect: '/'}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router =createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

router.resolve({
    name: 'not-found',
    params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'
  
export default router;