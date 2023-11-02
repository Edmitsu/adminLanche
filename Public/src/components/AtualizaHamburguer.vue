<template>
  <div>
    <h2>Atualizar Hamburguer</h2>
    <input v-model="search" placeholder="Search by Name">
    <button @click="searchHamburgers">Search</button>
    <ul v-if="showHamburgers">
      <li v-for="hamburger in hamburgers" :key="hamburger._id">
        <div v-if="hamburger.display">
          <img :src="getFullImageUrl(hamburger.img)" alt="Hamburger Image" width="100">
          <input v-model="hamburger.name">
          <input v-model="hamburger.price" type="number" step="0.01">
          <textarea v-model="hamburger.description"></textarea>
          <input type="file" name="file" @change="handleFileChange(hamburger)">
          <button @click="updateHamburger(hamburger)">Update Hamburger</button>
          <button @click="deleteHamburger(hamburger._id)">Delete Hamburger</button>
        </div>
      </li>
    </ul>
  </div>
  <router-link to="/add-hamburguer">
    <button class="my-button">Atualizar Hamburger</button>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      hamburgers: [],
      search: "",
      showHamburgers: false,
    };
  },
  methods: {
    getFullImageUrl(src) {
      return `http://localhost:4000/${src}`;
    },
    searchHamburgers() {
      if (this.search) {
        this.hamburgers.forEach(hamburger => {
          hamburger.display = hamburger.name.toLowerCase().includes(this.search.toLowerCase());
        });
        this.showHamburgers = true;
      } else {
        this.hamburgers.forEach(hamburger => {
          hamburger.display = true;
        });
        this.showHamburgers = false;
      }
    },
    handleFileChange(hamburger) {
      const fileInput = event.target;
      const file = fileInput.files[0];
      const hamburgerId = hamburger._id;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch(`http://localhost:4000/combos/${hamburgerId}`, {
          method: "PUT",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            const index = this.hamburgers.findIndex(item => item._id === hamburgerId);
            if (index !== -1) {
              this.hamburgers[index] = data;
            }
          })
          .catch((error) => console.error(error));
      }
    },
    updateHamburger(hamburger) {
      fetch(`http://localhost:4000/combos/${hamburger._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hamburger),
      })
        .then((response) => response.json())
        .then((data) => {
          const index = this.hamburgers.findIndex(item => item._id === hamburger._id);
          if (index !== -1) {
            this.hamburgers[index] = data;
          }
        })
        .catch((error) => console.error(error));
    },
    deleteHamburger(hamburgerId) {
      fetch(`http://localhost:4000/combos/${hamburgerId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          this.hamburgers = this.hamburgers.filter(item => item._id !== hamburgerId);
        })
        .catch((error) => console.error(error));
    },
    fetchHamburgers() {
      fetch("http://localhost:4000/combos")
        .then((response) => response.json())
        .then((data) => {
          this.hamburgers = data.map(hamburger => ({
            ...hamburger,
            display: true
          }));
        })
        .catch((error) => console.error(error));
    },
  },
  created() {
    this.fetchHamburgers();
  },
};
</script>

<style>
.my-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
div {
  text-align: center;
  background-color: #f0f0f0;
  padding: 20px;
}
h1 {
  font-size: 24px;
  color: #333;
}
input[type="text"] {
  padding: 8px;
  margin: 10px 0;
}
button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
}
img {
  max-width: 100%;
  height: auto;
}
input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}
button.update-button {
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
button.delete-button {
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
input[type="file"] {
  margin-top: 10px;
}
</style>

