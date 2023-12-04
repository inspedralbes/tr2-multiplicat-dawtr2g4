<template>
    <div>

        <RouterLink to="/sales">
            <div id="containerLanding" class="card flex justify-content-center">
                <div id="buttonContainer">
                    <Button id="buttonSales" type="button" label="ANAR A SALES" />
                </div>
            </div>
        </RouterLink>

        <Footer />

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
    text-decoration: none;
}

#buttonContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

#buttonSales {
    font-family: 'Roboto', sans-serif;
    padding: 25px;
    font-size: 20px;

    border-radius: 10px;
    border: 4px solid rgb(23, 50, 72);
    color: rgb(251, 154, 119);
}
</style>