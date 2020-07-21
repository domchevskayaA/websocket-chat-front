import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home';
import Chat from '../views/ChatPage';
import LoginPage from '../views/LoginPage';
import RegistrationPage from '../views/RegistrationPage';
import { getCookie } from '../utils/cookie';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/chat/:receiver_id",
      name: "Chat",
      component: Chat,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage
    },
    {
      path: "/registration",
      name: "Registration",
      component: RegistrationPage,
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = getCookie('token');
  if (to.name !== 'Login' && to.name !== 'Registration' && !token) {
    next({name: 'Login'});
  } else {
    next();
  }
});

export default router;
