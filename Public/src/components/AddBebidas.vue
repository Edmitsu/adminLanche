<template>
  <div>
    <h2>Adicionar Bebida</h2>
    <form @submit.prevent="addBebida">
      <div>
        <label for="quantity">Quantidade:</label>
        <input type="text" id="quantity" v-model="bebidaData.quantity" required>
      </div>
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="bebidaData.name" required>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <input type="text" id="description" v-model="bebidaData.description">
      </div>
      <div>
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model="bebidaData.price" required>
      </div>
      <div>
        <label for="image">Imagem:</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <button type="submit">Adicionar Bebida</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      bebidaData: {
        quantity: 1,
        name: '',
        description: '',
        price: null,
        image: null, 
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.bebidaData.image = event.target.files[0];
    },
    addBebida() {
      const formData = new FormData();
      formData.append('quantity', this.bebidaData.quantity);
      formData.append('name', this.bebidaData.name);
      formData.append('description', this.bebidaData.description);
      formData.append('price', this.bebidaData.price);
      formData.append('file', this.bebidaData.image); 

      axios.post('http://localhost:4000/bebidas', formData)
        .then(response => {
          console.log('Bebida adicionada com sucesso:', response.data);
        })
        .catch(error => {
          console.error('Erro ao adicionar a bebida:', error);
        });
    },
  },
};
</script>
<style>

.quntidade{
  display: none;
}

</style>