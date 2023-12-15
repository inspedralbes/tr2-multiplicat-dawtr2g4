<template>
    <div class="body">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 form">
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

                    <label for="password1" class="block text-900 font-medium mb-2">Contrassenya</label>
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
import { socket } from '@/socket';
import router from '../router';

export default {
    components: {
        InputText,
        Button,
        Checkbox
    },
    data() {
        return {
            store: useAppStore(),
            email: '',
            password: '',
        }
    },
    methods: {



        // const socket = socket();

        login() {
            fetch('http://'+this.store.getUrl()+':8000/api/login', {
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
                    if (data.error) {
                        alert(data.error);
                    } else {
                        this.store.setToken(data.token);
                        this.store.setUser(data.user.name);
                        this.store.setProfe(data.user.esAdmin);
                        router.push('/');
                    }
                })
                .catch(err => console.log(err));
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
}
</style>