<template>
  <div>
    <h1>Cadastro</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Nome" required>
      <input v-model="email" type="email" placeholder="E-mail" required>
      <input v-model="password" type="password" placeholder="Senha" required>
      <input v-model="confirmPassword" type="password" placeholder="Confirmar Senha" required>
      <button type="submit">Registrar</button>
    </form>
    <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
  </div>
  <router-link to="/">
      <button>Voltar para o Login</button>
    </router-link>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: null,
    };
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'As senhas não conferem!';
        return;
      }

      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword, 
      };

      try {
      
        const response = await axios.post('http://localhost:7000/auth/register', userData);

        if (response.status === 201) {
          
          this.$router.push('/');
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
         
          this.errorMessage = error.response.data.msg;
        } else {
         
          this.errorMessage = 'Erro no registro. Tente novamente mais tarde.';
          console.error('Erro no registro:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
