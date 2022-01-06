import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: "Home" }
      },
      {
        meta: {
          title: 'Login',
          hideNavbar: true
        },
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
      },
      {
        meta: {
          title: 'User Page',
         
        },
        path: '/users-page',
        name: 'UsersPage',
        component: () => import('../views/UsersPage.vue'),
      },
      {
        meta: {
          title: 'Create Event',
        },
        path: '/create-event',
        name: 'Create Event',
        component: () => import('../views/CreateEvent.vue'),
      },
]

const router = new VueRouter({
    routes,
    mode: 'history',
  })
  
  router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    if (to.name) {
      window.NProgress.start()
      window.NProgress.set(0.5);
    }
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title + " - EVENT XYX";
    window.scrollTo({ top: 0, behavior: 'smooth' })

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/users-page']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = sessionStorage.getItem('token')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
    next();
  });
  
  
  router.afterEach(() => {
    window.NProgress.set(0.8);
    setTimeout(() => window.NProgress.done(), 500)
  })
  export default router
  