<template>
  <div>
    <h2>Adicionar Hamburguer</h2>
    <form @submit.prevent="addCombo">
      <div class="quntidade">
        <label for="quantity">ID:</label>
        <input type="text" id="quantity" v-model="comboData.quantity" required>
      </div>
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="comboData.name" required>
      </div>
      <div>
        <label for="description">Descrição:</label>
        <input type="text" id="description" v-model="comboData.description">
      </div>
      <div>
        <label for="price">Preço:</label>
        <input type="number" id="price" v-model="comboData.price" required>
      </div>
      <div>
        <label for="image">Imagem:</label>
        <input type="file" id="image" @change="handleFileUpload">
      </div>
      <button type="submit">Adicionar Hamburguer</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comboData: {
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
      this.comboData.image = event.target.files[0];
    },
    addCombo() {
      const formData = new FormData();
      formData.append('quantity', this.comboData.quantity);
      formData.append('name', this.comboData.name);
      formData.append('description', this.comboData.description);
      formData.append('price', this.comboData.price);
      formData.append('file', this.comboData.image); 

      axios.post('http://localhost:4000/combos', formData)
        .then(response => {
          console.log('Combo adicionado com sucesso:', response.data);
        })
        .catch(error => {
          console.error('Erro ao adicionar o Hamburguer:', error);
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