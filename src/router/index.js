import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FAQ from '../views/FAQ.vue'
import Contacts from '../views/Contacts.vue'
import Art from '../views/Art.vue'
import state from '../store/state'

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Unreal Art - AI Generated Art at Romeria de Mayo'
    }
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ,
    meta: {
      title: 'All About UnrealArt'
    }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
    meta: {
      title: 'Contact Mario Mazzola'
    }
  },

  {
    path: '/art/:id',
    name: 'Art',
    component: Art,
    props: true,
    meta: {
      title: 'Artwork'
    }
  },

  //Catch all and redirect home
  {
    path: '/:pathMatch(.*)*',
    name: 'Home',
    component: Home,
    meta: {
      title: 'AI Generated Art and NFTs'
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})

router.afterEach((to, from) => {
  window.scroll(0, 0);
  state.close();
})

export default router
