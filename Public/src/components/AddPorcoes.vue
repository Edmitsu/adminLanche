<template>
  <div>
    <h1>Porções</h1>
    <input v-model="search" placeholder="Pesquisa pelo Nome">
    <button @click="searchPorcoes">Search</button>
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
  </div>
  <router-link to="/add-porcaos">
    <button class="my-button">Adicionar Porções</button>
  </router-link>
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
  /* Estilo para o contêiner principal */
  div {
    text-align: center;
    background-color: #f0f0f0;
    padding: 20px;
  }

  /* Estilo para o título H1 */
  h1 {
    font-size: 24px;
    color: #333;
  }

  /* Estilo para o campo de pesquisa */
  input[type="text"] {
    padding: 8px;
    margin: 10px 0;
  }

  /* Estilo para o botão de pesquisa */
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  /* Estilo para a lista de porções */
  ul {
    list-style: none; /* Remove os marcadores de lista (pontos) */
    padding: 0;
  }

  /* Estilo para cada item da lista (li) */
  li {
    background-color: #fff;
    padding: 10px;
    margin: 10px 0;
  }

  /* Estilo para a imagem da porção */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Estilo para campos de entrada de texto e número */
  input[type="text"],
  input[type="number"],
  textarea {
    width: 100%;
    padding: 8px;
    margin: 5px 0;
  }

  /* Estilo para o botão "Atualizar Porção" */
  button.update-button {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  /* Estilo para o botão "Excluir Porção" */
  button.delete-button {
    background-color: #dc3545;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  /* Estilo para o input de arquivo */
  input[type="file"] {
    margin-top: 10px;
  }
</style>
