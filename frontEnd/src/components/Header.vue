<script setup>
import { RouterLink } from 'vue-router'
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
                    <div v-if="profe" class="flex align-items-center gap-2">
                        <a href="">administrar</a>
                    </div>
                    <div class="flex align-items-center gap-2">
                        <p class="mr-3 font-bold">Benvingut {{ nom }}!</p>
                        <img @click="logout" class="logout" src="/img/logout.png" alt="logout" height="50" width="50">
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script>

import { useAppStore } from '../stores/app';

export default {
    components: {
        name: 'Header',
    },

    data() {
        return {
            store: useAppStore(),
        }
    },
    methods: {
        logout() {
            this.store.logout();
        }
    },
    computed: {
        token() {
            return this.store.getToken();
        },
        nom() {
            return this.store.getUser();
        },
        profe() {
            return this.store.getProfe();
        },
    },
}
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
.flex1 > :first-child {
    margin-right: 1rem;
}
</style>