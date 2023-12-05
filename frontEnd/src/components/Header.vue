<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar';
</script>
<template>
    <div id="header">
        <Menubar>
            <template #start>
                <RouterLink to="/">
                    <img src="../../public/img/icon_mathball.png" width="70" height="60" class="h-2rem" alt="lego" />
                </RouterLink>
            </template>

            <template #end>
                <div v-if="!token">
                    <RouterLink to="/login">
                        <div class="flex align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
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
                <div v-else>
                    <div class="flex align-items-center gap-2">
                        <p>{{ nom }}</p>
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script>

import { useAppStore } from '../stores/app';

export default {

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
        }
    },


    // setup() {

    //     const store = useAppStore();

    //     const token = computed(() => store.getToken());
    //     const nom = computed(() => store.getUser());

    //     watchEffect(() => {
    //         token.value = store.getToken();
    //         nom.value = store.getUser();
    //     });

    //     return { token, nom }
    // },
    components: { Menubar },

}
</script>

<style  scoped>
* {
    margin: 0;
    padding: 0;

}

#header {
    margin: 0;
    padding: 0;
    width: 100%;
}
</style>