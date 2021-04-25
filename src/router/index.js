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
    component: () => import('../views/About.vue'),
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
  const isLoggedIn = auth();
  if (!to.meta.requiresAuth && isLoggedIn) {
    return {name: 'Home'};
  } else if (to.meta.requiresAuth && !isLoggedIn) {
    return {name: 'Login'};
  }
});

export default router
