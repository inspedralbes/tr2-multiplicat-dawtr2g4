<template>
    <div>
        <h1>PARTIDA</h1>
    </div>
    <div id="flex-container">
        <div id="container">
            <img class="jugador home-base" id="jugador-0" src="/img/jugador.png" alt="jugador">
            <img class="camp" src="/img/camp.jpg" alt="">
            <!--<img class="jugador primera-base" src="./img/jugador.png" alt="jugador">
            <img class="jugador segona-base" src="./img/jugador.png" alt="jugador">
            <img class="jugador tercera-base" src="./img/jugador.png" alt="jugador">-->
        </div>
        <div id="moviment-bases">
            <p>Quantes bases us voleu moure?</p>
            <form id="form" action="" v-on:change="seleccionarBase()">
                <input type="radio" id="base1" name="base" value="1">
                <label for="base1"> 1 </label><br>
                <input type="radio" id="base2" name="base" value="2">
                <label for="base2"> 2 </label><br>
                <input type="radio" id="base3" name="base" value="3">
                <label for="base3"> 3 </label><br><br>
            </form>
            <h2 id="message"></h2>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                player: {id: 0, base: 0}
            }
        },
        methods: {
        seleccionarBase() {
            console.log("Base seleccionada");

            const bases = document.getElementsByName('base');
            const message = document.getElementById('message');
            const jugador = document.getElementById('jugador-0');

            let input;

            for (let i = 0; i < bases.length; i++) {
                if (bases[i].checked) {
                    input = bases[i].value;
                    bases[i].checked = false;
                }
            }

            if (input != "") {
                message.textContent = input;
                this.player.base = this.player.base + parseInt(input);
                this.pintarCamp();
                input = "";
            }
        },
        pintarCamp() {
            const jugador = document.getElementById('jugador-0');
            if (this.player.base == 0) {
                jugador.classList.add("home-base");
            } else if (this.player.base == 1) {
                jugador.classList.remove("home-base");
                jugador.classList.add("primera-base");
            }
             else if (this.player.base == 2) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.add("segona-base");
            } else if (this.player.base == 3) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.remove("segona-base");
                jugador.classList.add("tercera-base");
            } else if (this.player.base > 3) {
                jugador.classList.remove("primera-base");
                jugador.classList.remove("segona-base");
                jugador.classList.remove("tercera-base");
                jugador.classList.add("home-base");
            }
        }
    }
    }
</script>

<style lang="scss" scoped>

    #flex-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        column-gap: 20px;
    }

    #container {
        position: relative;
        width: 612px;
        height: 535px;
        border: 1px solid black;
    }

    .camp {
        width: 612px;
        height: 535px;
        position: absolute;
        object-fit: cover;
        z-index: -1;
    }

    .jugador {
        width: 60px;
        height: 60px;
    }

    #moviment-bases {
        border: 1px solid black;
        padding: 5px;
        height: 10%;
    }

    .home-base {
        position: absolute;
        bottom: 8%;
        left: 45%;
    }

    .primera-base {
        position: absolute;
        bottom: 34%;
        left: 64%;
    }

    .segona-base {
        position: absolute;
        bottom: 55%;
        left: 45%;
    }

    .tercera-base {
        position: absolute;
        bottom: 34%;
        left: 26%;
    }
</style>