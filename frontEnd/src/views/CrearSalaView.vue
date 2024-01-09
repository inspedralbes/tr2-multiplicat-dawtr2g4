<template>
    <div class="body">
        <div class="contingut">
            <h1>Creació de sala</h1>

            <label for="nom">Nom de la sala</label>
            <input type="text" id="nom" v-model="sala.nom" required>

            <label for="tempsVotarResposta">Temps per votar la resposta</label>
            <input type="number" id="tempsVotarResposta" v-model="sala.tempsVotarResposta" required>
            
            <label for="categoria">Categoria</label>
            <select id="categoria" v-model="sala.categoria" @input="afegirTreureCategoriaM">
                <option v-for="(actual, index) in categories" :value="actual.id">{{ actual.nom }}</option>
            </select>
            <div>
                <label for="categoria">Categories</label>
                <div v-for="(actual, index) in categories">
                    <div v-if="actual.seleccionada === 1">
                        <p>{{ actual.nom }}</p>
                        <button @click="afegirTreureCategoria(index)">X</button>
                    </div>
                </div>
            </div>

            <button @click="enviarPartida()">Crear sala</button>
        </div>
    </div>
</template>

<script>
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    data() {
        return {
            categories: [],
            sala: {
                nom: '',
                categories: [],
                tempsVotarResposta: '',
            }
        }
    },
    methods: {
        enviarPartida() {
            this.categories.forEach(element => {
                if(element.seleccionada === 1) {
                    this.sala.categories.push(element.id);
                }
            });
            if(this.sala.categories.length === 0) {
                alert("Has de seleccionar almenys una categoria");
                return;
            }
            socket.emit('crear-sala', this.sala);
            this.$router.push('/');
        },
        afegirTreureCategoria(index) {
            console.log(this.categories[index].nom);
            if(this.categories[index].seleccionada === 0) {
                this.categories[index].seleccionada = 1;
                console.log("afegida");
            } else {
                this.categories[index].seleccionada = 0;
                console.log("treta");
            }
        },
        afegirTreureCategoriaM(event){
            let index = event.target.value - 1;
            this.afegirTreureCategoria(index)
        },
    },
    created() {
        const store = useAppStore();
        let hostname = store.getUrl();
        let url;
        if(hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
            url = 'http://'+ hostname +'/backend-laravel/public/api/getCategories';
        } else {
            url = 'http://'+ hostname +':8000/api/getCategories';
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(element => {
                    element.seleccionada = 0;
                });
                this.categories = data;
            });
    },
}

</script>

<style scoped>

.body {
    position: relative;
}

.body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    z-index: -1;
}

h1 {
    text-align: center;
    font-size: 2em;
    color: #333;
}

.contingut {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.contingut label {
    margin-top: 10px;
    font-size: 1.2em;
    color: #666;
}

.contingut button {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 1em;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.contingut select {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
}

.contingut input {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    font-size: 1em;
    border-radius: 5px;
}

.contingut button:hover {
    background-color: #0056b3;
}</style>