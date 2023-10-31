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
import AtualizaHamburguer from './components/AtualizaHamburguer.vue';
import Porcaos from "./components/Porcaos.vue";
import Bebidas from "./components/Bebidas.vue"
</script>

<style scoped>
  /* Estilos do componente App.vue */
</style>
