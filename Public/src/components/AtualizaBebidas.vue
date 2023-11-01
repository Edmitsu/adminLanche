   <template>
    <div>
      <h1>Bebidas</h1>
      <input v-model="search" placeholder="Pesquisa pelo Nome">
      <button @click="searchBebidas">Search</button>
      <ul v-if="showBebidas">
        <li v-for="bebida in bebidas" :key="bebida._id">
          <div v-if="bebida.display">
            <img :src="getFullImageUrl(bebida.img)" alt="Imagem da Bebida" width="100">
            <input v-model="bebida.name">
            <input v-model="bebida.price" type="number" step="0.01">
            <textarea v-model="bebida.description"></textarea>
            <input type="file" name="file" @change="handleFileChange(bebida)">
            <button @click="updateBebida(bebida)">Atualizar a Bebida</button>
            <button @click="deleteBebida(bebida._id)">Excluir Bebida</button>
          </div>
        </li>
      </ul>
    </div>
    <router-link to="/add-bebidas">
      <button class="my-button">Adicionar Bebidas</button>
    </router-link>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bebidas: [],
        search: "",
        showBebidas: false,
      };
    },
    methods: {
      getFullImageUrl(src) {
        return `http://localhost:4000/${src}`;
      },
      fetchBebidas() {
        fetch("http://localhost:4000/bebidas")
          .then((response) => response.json())
          .then((data) => {
            this.bebidas = data.map(bebida => ({
              ...bebida,
              display: true
            }));
          })
          .catch((error) => console.error(error));
      },
      searchBebidas() {
        if (this.search) {
          this.bebidas.forEach(bebida => {
            bebida.display = bebida.name.toLowerCase().includes(this.search.toLowerCase());
          });
          this.showBebidas = true;
        } else {
          this.bebidas.forEach(bebida => {
            bebida.display = true;
          });
          this.showBebidas = false;
        }
      },
      updateBebida(bebida) {
        fetch(`http://localhost:4000/bebidas/${bebida._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bebida),
        })
          .then((response) => response.json())
          .then((data) => {
            const index = this.bebidas.findIndex(item => item._id === bebida._id);
            if (index !== -1) {
              this.bebidas[index] = data;
            }
          })
          .catch((error) => console.error(error));
      },
      deleteBebida(bebidaId) {
        fetch(`http://localhost:4000/bebidas/${bebidaId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            this.bebidas = this.bebidas.filter(item => item._id !== bebidaId);
          })
          .catch((error) => console.error(error));
      },
      handleFileChange(bebida) {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const bebidaId = bebida._id;
  
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
  
          fetch(`http://localhost:4000/bebidas/${bebidaId}`, {
            method: "PUT",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              const index = this.bebidas.findIndex(item => item._id === bebidaId);
              if (index !== -1) {
                this.bebidas[index] = data;
              }
            })
            .catch((error) => console.error(error));
        }
      },
    },
    created() {
      this.fetchBebidas();
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
 
   /* Estilo para a lista de bebidas */
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
 
   /* Estilo para a imagem da bebida */
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
 
   /* Estilo para o botão "Atualizar Bebida" */
   button.update-button {
     background-color: #28a745;
     color: #fff;
     padding: 10px 20px;
     border: none;
     cursor: pointer;
   }
 
   /* Estilo para o botão "Excluir Bebida" */
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