<template>
    <div>
        <h1 class="tit">Select Team</h1>
        <div class="cont">
            <div>
                <button class="button e1">Equip 1</button>
            </div>
            <div>
                <button class="button e2">Equip 2</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.tit {
    margin-top: 50px;
    margin-bottom: 100px;
}

.cont {
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
}

.button {
    height: 400px;
    width: 400px;
    border: 2px solid transparent;
    color: white;
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.e1 {
    background-color: #ff4d4d;
    /* Rojo */
}

.e2 {
    background-color: #4da6ff;
    /* Azul */
}

.button:hover {
    border-color: #ffffff;
    /* Blanco */
}</style>
