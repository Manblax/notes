import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import {getAuthUser} from '../api'

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
    path: '/create',
    name: 'CreateNote',
    component: () => import('../views/CreateNote.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: () => import('../views/EditNote'),
    meta: {
      requiresAuth: true
    }
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


router.beforeEach((to) => {
  const isLoggedIn = getAuthUser();
  if (!to.meta.requiresAuth && isLoggedIn) {
    return {name: 'Home'};
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    return {name: 'Login'};
  }
});

export default router
