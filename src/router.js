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
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     const currentUser = firebase.auth().currentUser;
//     if (!currentUser) {
//       next({ path: '/login' });
//     }
//   }
//   next();
// });

export default router;