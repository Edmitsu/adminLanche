<template>
  <nav v-if="isUserLoggedIn">
    <div class="navbar">
      <div class="brand">
        <router-link to="/home">Adm Lanche on Net</router-link>
      </div>
      <ul class="nav-links">
        <li><router-link to="/add-hamburguer">Adicionar hamburger</router-link></li>
        <li><router-link to="/add-porcoes">Adicionar Porções</router-link></li>
        <li><router-link to="/add-bebidas">Adicionar Bebidas</router-link></li>
        <li><router-link to="/atualiza-hamburguer">Atualizar Hambúrguer</router-link></li>
        <li><router-link to="/atualiza-bebidas">Atualizar bebidas</router-link></li>
        <li><router-link to="/atualiza-porcoes">Atualizar porções</router-link></li>
        <li @click="logout">Logout</li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const isUserLoggedIn = ref(false);

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  isUserLoggedIn.value = !!localStorage.getItem("token");
});


const redirectToLogin = () => {
  router.push("/"); 
};


const logout = () => {
  
  localStorage.removeItem("token");
  isUserLoggedIn.value = false;
  redirectToLogin();
};


watch(
  () => route.path,
  () => {
    
    isUserLoggedIn.value = !!localStorage.getItem("token");
  }
);


const login = () => {
  
  const token = "8f9cf2b3-5747-4b60-a771-145d6d1eef00"; 
  localStorage.setItem("token", token);
  isUserLoggedIn.value = true; 

  router.push("/home"); 
};
</script>


<style scoped>
nav {
  background-color: #007bff;
  color: #000000; 
  top: 0; 
  width: 100%; 
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0; /* Remova o espaçamento interno das <ul> */
  margin: 0; /* Remova a margem das <ul> */
}

.nav-links li {
  padding: 0.5rem;
}

a {
  text-decoration: none;
  color: #000000;
  cursor: pointer;
  transition: color 0.3s;
}

a:hover {
  text-decoration: underline;
  color: #f00;
}
</style>
