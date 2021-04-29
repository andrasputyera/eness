import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/components/Index.vue'
import AddSmoothie from '@/components/AddSmoothie.vue'
import EditSmoothie from '@/components/EditSmoothie.vue'


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-smoothie',
    name: 'AddSmoothie',
    component: AddSmoothie
  },
  {
    path: '/edit-smoothie/:smoothie_slug',
    name: 'EditSmoothie',
    component: EditSmoothie
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
