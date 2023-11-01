<template>
  <div>
    <header>
      <Nav />
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Nav from "./components/Nav.vue";
import AddBebida from './components/AddBebidas.vue';
import AddHamburguer from './components/addHamburguer.vue'
import AddPorcoes from './components/AddPorcoes.vue'
import AtualizaBebidas from './components/AtualizaBebidas.vue'
import AtualizaHamburguer from './components/AtualizaHamburguer.vue'
import AtualizaPorcoes from './components/AtualizaPorcoes.vue'
import Cadastro from './components/Cadastro.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
</script>

<style scoped>
  /* Estilos do componente App.vue */
</style>
