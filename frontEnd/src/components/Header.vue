<script setup>
import { RouterLink } from 'vue-router'
import Menubar from 'primevue/menubar';
</script>
<template>
    <div>
        <Menubar>
            <template #start>
                <RouterLink to="/">
                    <img src="/img/icon_no_text.png" width="50" height="50" alt="lego" />
                </RouterLink>
            </template>

            <template #end>
                <RouterLink to="/login">
                    <div class="flex align-items-center gap-2 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-filled" width="50"
                            height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
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
        name: 'Header',
    },// 2196F3
}
</script>

<style  scoped>
    .p-menubar {
        background-color: #f8f9fa;
    }
</style>