import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/AnaSayfa'
  },
  {
    path: '/AnaSayfa',
    name: 'AnaSayfa',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
