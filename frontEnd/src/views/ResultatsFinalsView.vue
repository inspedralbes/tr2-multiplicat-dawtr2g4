<template>
    <div class="wrapper overflow-x-hidden">
        <div class="scoreboard mt-6">
            <h2 class="text-center text-bluegray-200 text-6xl">RESULTATS FINALS</h2>
            <div :class="[determinarEquipGuanyador()]"><h3 class="text-white text-4xl informacio-guanyador">ENHORABONA, EQUIP <span v-if="comptadorEquip1 > comptadorEquip2">1</span><span v-else>2</span>! SOU ELS GUANYADORS</h3></div>
            <div class="contenidor-taula mt-6">
                <div class="contenidor-equip">
                    <h2 class="green"> ### </h2>
                    <h2>EQUIP 1</h2>
                    <h2 style="margin-top: -10px;">EQUIP 2</h2>
                </div>
                <div class="punts">
                <div  v-for=" (actual, index) in res">
                    <div class="n" v-if="actual.equipAtacant == 1">
                        <h2>{{ index + 1 }}</h2>
                        <h2 class="contenidor-punts">{{ actual.punts }}</h2>
                        <h2 class="contenidor-punts">0</h2>
                    </div>
                    <div class="n" v-else>
                        <h2>{{ index + 1 }}</h2>
                        <h2 class="contenidor-punts">0</h2>
                        <h2 class="contenidor-punts">{{ actual.punts }}</h2>
                    </div>
                </div>
            </div>
                <div class="total">
                    <h2>TOTAL</h2>
                    <h2 class="contenidor-punts">{{ comptadorEquip1 }}</h2>
                    <h2 class="contenidor-punts">{{ comptadorEquip2 }}</h2>
                </div>
            </div>
        </div>
        <div class="flex justify-content-center mt-5">
            <button class="tornar_landing_button" @click="tornarInici">TORNAR A LA PANTALLA PRINCIPAL</button>
        </div>
    </div>
</template>

<script>

import { useAppStore } from '../stores/app';

export default {
    data() {
        return {
            comptadorEquip1: 0,
            comptadorEquip2: 0,
        }
    },
    setup() {
        const store = useAppStore();

        const res = store.getRondes();

        return { res };
    },
    methods: {
        calcularPuntuacioTotal(idEquip) {
            let comptadorEquip = 0;
            for (let index = 0; index < this.res.length; index++) {
                if (this.res[index].equipAtacant == idEquip) {
                    comptadorEquip = comptadorEquip + this.res[index].punts;
                }
            }
            return comptadorEquip;
        },
        determinarEquipGuanyador() {
            if (this.comptadorEquip1 > this.comptadorEquip2) {
                return "e1"
            } else {
                return "e2"
            }
        },
        tornarInici() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.comptadorEquip1 = this.calcularPuntuacioTotal(1);
        this.comptadorEquip2 = this.calcularPuntuacioTotal(2);
    }


}

</script>

<style scoped>

@font-face {
    font-family: 'Digital Display';
    src: url('https://praxeds.github.io/scrimba-basketball-scoreboard/Assets/Digital-Display.woff2') format('woff2'),
        url('https://praxeds.github.io/basketball-scoreboard/Assets/Digital-Display.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

.informacio-guanyador {
    padding: 20px 0px;
    width: fit-content;
    transform: translateX(-100%);
    animation: leftToRight linear 12s infinite;
}

@keyframes leftToRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(275%);
  }
}

.e1 {
    background-color: #ff4d4d;
}

.e2 {
    background-color: #3273b4;
}
.wrapper {
    position: relative;
}

.wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(8px);
    z-index: -1;
}
.scoreboard {
    width: 100%;
    margin: 0 auto;
}

.scoreboard h2 {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 20px;
}

.contenidor-taula {
    background-color: #1e4620;
    border: 7px solid white;
    outline: 10px solid #1e4620;
    border-radius: 8px;
    
    grid-template-areas:
    "equip punts total"
    "equip punts total"
    "equip punts total";

    display: grid;
    gap: 20px;
    width: fit-content;
    margin: 0 auto;
}

.contenidor-equip .green {
    color: #1e4620;
}

.contenidor-taula .contenidor-punts {
    background-color: #0c0c0c;
    font-family: 'Digital Display', monospace;
    color: rgb(255, 217, 0);
    width: 40px;
    font-size: 2.6em;

}

.contenidor-taula  h2 {
    padding: 15px;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 2em;
    color: white;
}

.contenidor-equip{
    grid-area: equip;
    width: fit-content;
}

.punts {
    grid-area: punts;
    display: flex;
}

.n {
    width: fit-content;
}

.total {
    grid-area: total;
    width: fit-content;
}

.total, .contenidor-equip, .n {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scoreboard table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.scoreboard th,
.scoreboard td {
    border: 1px solid #000;
    padding: 10px;
}

.tornar_landing_button {
    border: 1px solid black;
    background-color: white;
    font-size: 1rem;
    color: #000000;
    padding: 10px 20px;
    cursor: pointer;
    margin: auto;
    border-radius: 15px;
}

.tornar_landing_button:hover {
    background-color: #000000;
    color: #ffffff;
}
</style>