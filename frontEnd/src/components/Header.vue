<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar';
</script>
<template>
    <div id="header">
        <Menubar>
            <template #start>
                <RouterLink to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Legoland_logo.svg/1280px-Legoland_logo.svg.png"
                        width="120" height="40" class="h-2rem" alt="lego" />
                </RouterLink>
            </template>

            <template #end>
                <RouterLink to="/login">
                    <div class="flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" stroke-width="0"
                                fill="currentColor" />
                            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
                                stroke-width="0" fill="currentColor" />
                        </svg>
                    </div>
                </RouterLink>
            </template>
        </Menubar>
    </div>
</template>

<script>
export default {
    components: {
        Menubar
    },

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