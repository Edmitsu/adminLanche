/* __placeholder__ */
export default (await import('vue')).defineComponent({
data() {
return {
hamburguers: [],
search: "",
showHamburguers: false,
error: null,
};
},
methods: {
getFullImageUrl(src) {
return `http://localhost:4000/${src}`;
},
async fetchHamburguers() {
try {
const response = await fetch("http://localhost:4000/combos");
if (!response.ok) {
throw new Error("Erro ao buscar hambúrgueres");
}
const data = await response.json();
this.hamburguers = data.map(hamburger => ({
...hamburger,
display: true
}));
} catch (error) {
this.error = "Erro ao buscar hambúrgueres: " + error.message;
}
},
async searchHamburguers() {
if (this.search) {
this.hamburguers.forEach(hamburger => {
hamburger.display = hamburger.name.toLowerCase().includes(this.search.toLowerCase());
});
this.showHamburguers = true;
} else {
this.hamburguers.forEach(hamburger => {
hamburger.display = true;
});
this.showHamburguers = false;
}
},
async updateCombo(hamburger) {
try {
const response = await fetch(`http://localhost:4000/combos/${hamburger._id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(hamburger),
});
if (!response.ok) {
throw new Error("Erro ao atualizar o hambúrguer");
}
const data = await response.json();
const index = this.hamburguers.findIndex(item => item._id === hamburger._id);
if (index !== -1) {
this.hamburguers[index] = data;
}
} catch (error) {
this.error = "Erro ao atualizar o hambúrguer: " + error.message;
}
},
async deleteCombo(hamburgerId) {
try {
const response = await fetch(`http://localhost:4000/combos/${hamburgerId}`, {
method: "DELETE",
});
if (!response.ok) {
throw hamburgerId; Error("Erro ao excluir o hambúrguer");
}
await response.json();
this.hamburguers = this.hamburguers.filter(item => item._id !== hamburgerId);
} catch (error) {
this.error = "Erro ao excluir o hambúrguer: " + error.message;
}
},
async handleFileChange(hamburger) {
const input = this.$refs.fileInput;
const file = input.files[0];
const hamburgerId = hamburger._id;

if (file) {
try {
const formData = new FormData();
formData.append("image", file);

const response = await fetch(`http://localhost:4000/combos/${hamburgerId}`, {
method: "POST",
body: formData,
});
if (!response.ok) {
throw new Error("Erro ao atualizar a imagem do hambúrguer");
}
const data = await response.json();

const index = this.hamburguers.findIndex(item => item._id === hamburgerId);
if (index !== -1) {
this.hamburguers[index] = data;
}
} catch (error) {
this.error = "Erro ao atualizar a imagem do hambúrguer: " + error.message;
}
}
},
},
created() {
this.fetchHamburguers();
},
});
