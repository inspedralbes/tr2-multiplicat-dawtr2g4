<script setup>
import { RouterLink, routerKey } from 'vue-router'
import Menubar from 'primevue/menubar';
</script>
<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <div class="flex gap-5">
                    <RouterLink to="/">
                        <img src="/img/icon_no_text.png" width="50" height="50" alt="lego" />
                    </RouterLink>
                    <div class="font-bold text-4xl">MathBall</div>
                </div>

            </template>

            <template #end>
                <div v-if="!token">
                    <RouterLink to="/login">
                        <div class="flex align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled"
                                width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0"
                                    fill="currentColor" />
                                <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
                                    stroke-width="0" fill="currentColor" />
                            </svg>
                        </div>
                    </RouterLink>
                </div>
                <div v-else class="flex1">
                    <div class="flex align-items-center gap-2">
                        <div>
                            <svg @click="show = !show" xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-menu-2 menu" width="50" height="50" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 6l16 0" />
                                <path d="M4 12l16 0" />
                                <path d="M4 18l16 0" />
                            </svg>
                            <transition name="slide">
                                <div v-show="show" class="accordion-content">
                                    <button v-if="profe" @click="goPreg">Preguntes</button>
                                    <button v-if="profe" @click="goCat">Categories</button>
                                    <button v-if="profe" @click="goUsr">Usuaris</button>
                                    <Button @click="perfil" severity="primary" raised rounded size="large" label="Perfil" />
                                    <button @click="logout">Logout</button>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script>

import { useAppStore } from '../stores/app';
import router from '../router';

export default {
    components: {
        name: 'Header',
    },

    data() {
        return {
            store: useAppStore(),
            show: false,
        }
    },
    methods: {
        logout() {
            router.push('/');
            this.store.logout();
            let hostname = this.store.getUrl();
            let url;
            if (hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                url = 'http://' + hostname + '/backend-laravel/public/api/logout';
            } else {
                url = 'http://' + hostname + ':8000/api/logout';
            }
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                });

        },
        goPreg() {
            window.location.href = this.url + 'preguntes';
        },
        goCat() {
            window.location.href = this.url + 'categories';
        },
        goUsr() {
            window.location.href = this.url + 'users';
        },
        perfil() {
            router.push('/perfil');
            this.show = false;
        },
        closeMenu(event) {
            if (!this.$el.contains(event.target)) {
                this.show = false; // Oculta el menú si se hace clic fuera de él
            }
        },
    },
    computed: {
        token() {
            return this.store.getToken();
        },
        nom() {
            return this.store.getUserName();
        },
        profe() {
            return this.store.getProfe();
        },
        url() {
            let hostname = this.store.getUrl();
            let url;
            if (hostname === 'tr2g4.daw.inspedralbes.cat' || hostname === 'mathball.daw.inspedralbes.cat') {
                url = 'http://' + hostname + '/backend-laravel/public/';
            } else {
                url = 'http://' + hostname + ':8000/';
            }
            return url;
        },
    },
    mounted() {
        document.addEventListener('click', this.closeMenu);
    },

    beforeUnmount() {
        document.removeEventListener('click', this.closeMenu); // Remueve el listener al destruir el componente
    },
};
</script>

<style  scoped>
.p-menubar {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e3e3e3;
    padding-left: 2rem;
    padding-right: 2rem;
}

.icon {
    color: #2196F3;
}

.logout {
    cursor: pointer;
}

.flex1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex1> :first-child {
    margin-right: 1rem;
}

.menu {
    cursor: pointer;
}

.accordion-content {
    right: 8px;
    position: absolute;
    background-color: #f1f1f1;
    width: fit-content;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 1rem;
    border-radius: 5px;
}

.accordion-content button {
    background-color: #2196F3;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: medium;
}

.accordion-content a {
    width: 100%;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(10px);
    transform: translateY(-10px);
    opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
    transform: translateY(0);
    opacity: 1;
}

a {
    color: white;
    text-decoration: none;
}
</style>