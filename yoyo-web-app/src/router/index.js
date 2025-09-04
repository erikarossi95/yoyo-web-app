import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue' 
import VideoPage from '../components/VideoPage.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/video/:youtubeId',
      name: 'video',
      component: VideoPage,
      props: true,
    },
  ],
})

export default router
