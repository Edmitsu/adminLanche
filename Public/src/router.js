import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue'; 
import AtualizaHamburguer from './components/AtualizaHamburguer.vue';
import AddHamburguer from './components/AddHamburguer.vue';
import AddBebida from './components/AddBebidas.vue';
import Porcaos from './components/Porcaos.vue';
import Bebidas from './components/Bebidas.vue';
import AddPorcaos from './components/AddPorcaos.vue';
import cadastro from './components/Cadastro.vue';



const routes = [
  {
    path: '/',
    component: Login, 
    meta: { requiresAuth: false }, 
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: false }, 
  },
  {
    path: '/atualiza-hamburguer',
    component: AtualizaHamburguer,
    meta: { requiresAuth: false },
  },
  {
    path: '/porcaos',
    component: Porcaos,
    meta: { requiresAuth: false },
  },
  {
    path: '/bebidas',
    component: Bebidas,
    meta: { requiresAuth: false },
  },
  {
    path: '/add-hamburguer',
    component: AddHamburguer,
    meta: { requiresAuth: false },
  },
  {
    path: '/add-bebidas',
    component: AddBebida,
    meta: { requiresAuth: false },
  },
  {
    path: '/add-porcaos',
    component: AddPorcaos,
    meta: { requiresAuth: false },
  },
  {
    path: '/cadastro',
    component: cadastro,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    const token = localStorage.getItem('token'); 

    if (token) {
      
      next(); 
    } else {
      
      next('/');
    }
  } else {
    next(); 
  }
});

export default router;




