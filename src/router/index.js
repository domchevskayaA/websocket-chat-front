import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home';
import Chat from '../views/ChatPage';
import LoginPage from '../views/LoginPage';
import RegistrationPage from '../views/RegistrationPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      // component: DefaultContainer,
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
      // component: DefaultContainer,
    },
    {
      path: "/registration",
      name: "Registration",
      component: RegistrationPage
      // component: DefaultContainer,
    }
  ]
})
