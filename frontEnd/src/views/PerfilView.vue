<template>
    <div class="body">
        <div class="forms">
            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 form">
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Perfil</div>
                </div>
    
                <div>
                    <form @submit.prevent="updateUser">
    
                        <label for="name" class="block text-900 font-medium mb-2">Nom</label>
                        <InputText v-model="user.name" id="name" type="text" required class="w-full mb-3" />
    
                        <Button label="Guardar canvis" type="submit" icon="pi pi-user" class="w-full"></Button>
                    </form>
                </div>
            </div>

            <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 form">
                <div class="text-center mb-5">
                    <div class="text-900 text-3xl font-medium mb-3">Canviar contrasenya</div>
                </div>
    
                <div>
                    <form @submit.prevent="updatePassword">
    
                        <label for="password1" class="block text-900 font-medium mb-2">Contrasenya</label>
                        <InputText v-model="password" id="password1" type="password" required class="w-full mb-3" />
    
                        <label for="password2" class="block text-900 font-medium mb-2">Repeteix la contrasenya</label>
                        <InputText v-model="password_confirmation" id="password2" type="password" required
                            class="w-full mb-3" />
    
                        <Button label="Canviar contrasenya" type="submit" icon="pi pi-user" class="w-full"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAppStore } from '../stores/app';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import router from '../router';

export default {
    components: {
        InputText,
        Button,
    },
    data() {
        return {
            store: useAppStore(),
            user: useAppStore().getUser(),
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        updateUser() {
            let hostname = this.store.getUrl();
            let url;
            if (hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                url = 'http://' + hostname + '/backend-laravel/public/api/updateUser';
            } else {
                url = 'http://' + hostname + ':8000/api/updateUser';
            }
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.user.id,
                    name: this.user.name,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.errors) {
                        alert(data.errors);
                    } else {
                        this.store.setUserName(data.name)

                        localStorage.setItem('user', JSON.stringify(this.store.getUser()));
                        router.push('/');
                    }
                })
        },
        updatePassword() {
            if (this.password !== this.password_confirmation) {
                alert("Les contrasenyes no coincideixen");
                return;
            }
            let hostname = this.store.getUrl();
            let url;
            if (hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                url = 'http://' + hostname + '/backend-laravel/public/api/updatePassword';
            } else {
                url = 'http://' + hostname + ':8000/api/updatePassword';
            }
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.user.id,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.errors) {
                        alert(data.errors);
                    } else {
                        router.push('/');
                    }
                })
        }
    },
}
</script>

<style scoped>
.forms {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 2rem;
    flex-grow: 1;
    width: 100%;
}

.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content;
}
</style>