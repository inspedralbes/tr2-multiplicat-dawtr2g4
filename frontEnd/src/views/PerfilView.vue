<template>
    <div class="body">
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
            user: useAppStore().getUser()
        }
    },
    methods: {
        mostrarInfoUser() {
            console.log(this.user);
        },
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


        }
    },
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