<template>
  <div class="container">
    <h2>Atualizar Porções</h2>
    <input class="search" v-model="search" placeholder="Pesquisa pelo Nome">
    <button @click="searchPorcoes">Pesquisar</button>
    <ul v-if="showPorcoes">
      <li v-for="porcao in porcoes" :key="porcao._id">
        <div v-if="porcao.display">
          <img :src="getFullImageUrl(porcao.img)" alt="Imagem da Porção" width="100">
          <input v-model="porcao.name">
          <input v-model="porcao.price" type="number" step="0.01">
          <textarea v-model="porcao.description"></textarea>
          <input type="file" name="file" @change="handleFileChange(porcao)">
          <button @click="updatePorcao(porcao)">Atualizar a Porção</button>
          <button @click="deletePorcao(porcao._id)">Excluir Porção</button>
        </div>
      </li>
    </ul>
    <router-link to="/add-porcaos">
      <button class="my-button">Atualizar Porção</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      porcoes: [],
      search: "",
      showPorcoes: false,
    };
  },
  methods: {
    getFullImageUrl(src) {
      return `http://localhost:4000/${src}`;
    },
    fetchPorcoes() {
      fetch("http://localhost:4000/porcaos")
        .then((response) => response.json())
        .then((data) => {
          this.porcoes = data.map(porcao => ({
            ...porcao,
            display: true
          }));
        })
        .catch((error) => console.error(error));
    },
    searchPorcoes() {
      if (this.search) {
        this.porcoes.forEach(porcao => {
          porcao.display = porcao.name.toLowerCase().includes(this.search.toLowerCase());
        });
        this.showPorcoes = true;
      } else {
        this.porcoes.forEach(porcao => {
          porcao.display = true;
        });
        this.showPorcoes = false;
      }
    },
    updatePorcao(porcao) {
      fetch(`http://localhost:4000/porcao/${porcao._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(porcao),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.porcoes.findIndex(item => item._id === porcao._id);
          if (index !== -1) {
            this.porcoes[index] = porcao;
          }
        })
        .catch((error) => console.error(error));
    },
    deletePorcao(porcaoId) {
      fetch(`http://localhost:4000/porcao/${porcaoId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.porcoes = this.porcoes.filter(item => item._id !== porcaoId);
        })
        .catch((error) => console.error(error));
    },
    handleFileChange(porcao) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const porcaoId = porcao._id;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch(`http://localhost:4000/porcao/${porcaoId}`, {
          method: "PUT",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const index = this.porcoes.findIndex(item => item._id === porcaoId);
            if (index !== -1) {
              this.porcoes[index] = data; 
            }
          })
          .catch((error) => console.error(error));
      }
    },
  },
  created() {
    this.fetchPorcoes();
  },
};
</script>

<style>
  
</style>
