import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { firebase } from './firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/admin-instituciones',
      name: 'admin-instituciones',
      component: () => import('./views/AdminInstituciones.vue')
    },
    {
      path: '/admin-usuarios',
      name: 'admin-usuarios',
      component: () => import('./views/UpdateDelete.vue')
    },
    {
      path: '/admin-clases',
      name: 'admin-clases',
      component: () => import('./views/AdminClases.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('./views/Admin.vue')
    }
  ]
});

/*router.beforeEach((to, from, next) => {
   if (to.path !== '/login') {
     const currentUser = firebase.auth().currentUser;
     if (!currentUser) {
       console.log("estooy aqui?");
       next({ path: '/login' });
     }
   }
  next();
});*/

export default router;