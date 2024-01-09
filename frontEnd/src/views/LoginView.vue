<template>
    <div class="body">
        <div v-if="loading" class="loading-message">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else class="surface-card p-4 shadow-2 border-round w-full lg:w-6 form">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Benvingut</div>
                <span class="text-600 font-medium line-height-3">No tens un compte?</span>
                <RouterLink to="/register">
                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Registra't aquí!</a>
                </RouterLink>
            </div>

            <div>
                <form @submit.prevent="login">
                    <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                    <InputText v-model="email" id="email1" type="email" class="w-full mb-3" />
                    <label for="password1" class="block text-900 font-medium mb-2">Contrasenya</label>
                    <InputText v-model="password" id="password1" type="password" class="w-full mb-3" />
                    <Button label="Sign In" type="submit" icon="pi pi-user" class="w-full"></Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { useAppStore } from '../stores/app';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import router from '../router';

export default {
    components: {
        InputText,
        Button,
        Checkbox,
    },
    data() {
        return {
            store: useAppStore(),
            email: '',
            password: '',
            loading: false,
        }
    },
    methods: {

        login() {
            this.loading = true;
            let hostname = this.store.getUrl();
            let url;
            if(hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                url = 'http://'+ hostname +'/backend-laravel/public/api/login';
            } else {
                url = 'http://'+ hostname +':8000/api/login';
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
                .then(res => res.json())
                .then(data => {
                    this.loading = false;
                    if (data.error) {
                        this.logIncorrecte(data.error);
                    } else {
                        this.logCorrecte(data);
                    }
                })
                .catch(err => {
                    this.loading = false;
                    console.log(err)
                });
        },
        logIncorrecte(errorMessage) {
            alert(errorMessage);
        },
        logCorrecte(data) {
            this.store.setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                esAdmin: data.user.esAdmin === 1 ? true : false,
                token: data.token,
            });
            localStorage.setItem('user', JSON.stringify(this.store.getUser()));
            router.push('/');
        }
    }
}
</script>

<style scoped>
.form {
    width: fit-content;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.body {
    height: fit-content;
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

.loading-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 5px;
}
</style>