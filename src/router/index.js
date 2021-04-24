import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from "../middleware/auth";
// import {guest} from "../middleware/guest";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/auth/Register'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    if (auth()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})

export default router
