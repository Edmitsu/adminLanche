<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input class="input-login" v-model="email" type="email" placeholder="E-mail" required>
      <input class="input-login" v-model="password" type="password" placeholder="Senha" required>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <router-link to="/cadastro">
      <button class="my-button">Cadastrar</button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
    };
  },
  methods: {
    async login() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        
        const response = await axios.post('http://localhost:7000/auth/login', userData);

        if (response.status === 200) {
          
          localStorage.setItem('token', response.data.token);

          
          this.$router.push('/home'); 
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            this.errorMessage = 'Autenticação falhou. Verifique suas credenciais.';
          } else if (error.response.status === 404) {
            this.errorMessage = 'Usuário não encontrado';
          } else if (error.response.status === 422) {
            this.errorMessage = 'Senha inválida';
          } else {
            this.errorMessage = 'Erro no login. Tente novamente mais tarde.';
          }
        } else {
          this.errorMessage = 'Erro no login. Tente novamente mais tarde.';
        }
        console.error('Erro no login:', error);
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
