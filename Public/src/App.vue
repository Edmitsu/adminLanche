<template>
  <section id="Nav">
    <Nav />
  </section>
  <section id="Content">
    <router-view></router-view>
  </section>  
</template>

<script setup>
import Nav from "./components/Nav.vue";

</script>

<style>
.Content{
  height: 100%;
}
</style>
