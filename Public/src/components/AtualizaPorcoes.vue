<template>
  <div>
    <h2>Editar Porção</h2>
    <form @submit.prevent="updatePorcao">
      <div class="quntidade">
        <label for="quantity">Quantity:</label>
        <input type="text" id="quantity" v-model="porcaoData.quantity" required>
      </div>
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="porcaoData.name" required>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <input type="text" id="description" v-model="porcaoData.description">
      </div>
      <div>
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model="porcaoData.price" required>
      </div>
      <div>
        <label for="image">Nova Imagem:</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <button type="submit">Atualizar Porção</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      porcaoData: {
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
      this.porcaoData.image = event.target.files[0];
    },
    updatePorcao() {
      const formData = new FormData();
      formData.append('quantity', this.porcaoData.quantity);
      formData.append('name', this.porcaoData.name);
      formData.append('description', this.porcaoData.description);
      formData.append('price', this.porcaoData.price);
      formData.append('file', this.porcaoData.image);
      axios.post(`http://localhost:4000/porcao`, formData)
        .then(response => {
          console.log('Porção atualizada com sucesso:', response.data);
          
        })
        .catch(error => {
          console.error('Erro ao atualizar a porção:', error);
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