import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue'
import CreateBlog from '../views/CreateBlogView.vue'
import LatestBlogs from '../views/LatestBlogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register},
    { path: '/create', component: CreateBlog },
    { path: '/blogs', component: LatestBlogs },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const isLoggedIn = !!localStorage.getItem('token');
  

  if (authRequired && !isLoggedIn) {
    return next('/login');
  }
  next();
});

export default router
