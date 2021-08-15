import { createRouter, createWebHistory } from 'vue-router'
import ChatRoom from '../components/ChatRoom.vue'
import Login from '../components/Login.vue'

// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'chatroom',
    component: ChatRoom
  },
  {
    path: '/login',
    name: 'login',
    component:Login

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
