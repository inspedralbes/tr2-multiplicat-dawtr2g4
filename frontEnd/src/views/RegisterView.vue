<template>
    <div class="body">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 form">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Benvingut</div>
                <span class="text-600 font-medium line-height-3">Ja tens un compte?</span>
                <RouterLink to="/login">
                    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Login aquí!</a>
                </RouterLink>
            </div>

            <div>
                <form @submit.prevent="register">

                    <label for="name" class="block text-900 font-medium mb-2">Nom</label>
                    <InputText v-model="name" id="name" type="text" required class="w-full mb-3" />

                    <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                    <InputText v-model="email" id="email1" type="email" required class="w-full mb-3" />

                    <label for="password1" class="block text-900 font-medium mb-2">Contrasenya</label>
                    <InputText v-model="password" id="password1" type="password" required class="w-full mb-3" />

                    <label for="password2" class="block text-900 font-medium mb-2">Repeteix la contrasenya</label>
                    <InputText v-model="password1" id="password2" type="password" required class="w-full mb-3" />

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
        Checkbox
    },
    data() {
        return {
            store: useAppStore(),
            name: '',
            email: '',
            password: '',
            password1: ''
        }
    },
    methods: {

        register() {
            if (this.password === this.password1) {
                let hostname = this.store.getUrl();
                let url;
                if(hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                    url = 'http://'+ hostname +'/backend-laravel/public/api/register';
                } else {
                    url = 'http://'+ hostname +':8000/api/register';
                }
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password1
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.errors) {
                            alert(data.errors);
                        } else {
                            this.store.setUser({
                                id: data.user.id,
                                name: data.user.name,
                                email: data.user.email,
                                esAdmin: false,
                                token: data.token,
                            })
                            localStorage.setItem('user', JSON.stringify(this.store.getUser()));
                            router.push('/');
                        }
                    })
                    .catch(err => console.log(err));

            } else {
                alert('Les contrasenyes no coincideixen');
            }
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
</style>