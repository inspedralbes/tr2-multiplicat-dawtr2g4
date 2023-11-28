<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <div>
        <RouterLink to="/sales">
            <div class="card flex justify-content-center">
                <Button type="button" label="ANAR A SALES"/>
            </div>
        </RouterLink>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>