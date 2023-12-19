<template>
    <div>
        <div class="scoreboard">
            <h2>Resultats Finals</h2>
            <div class="contenidor-taula">
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
                <!--<table>
                <thead>
                    <tr>
                        <th></th>
                        <th v-for=" (actual, index) in res">
                            {{ index }}
                        </th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Equip 1</td>
                        <th v-for=" actual in res">
                            <p v-if="actual.equipAtacant == 1">
                                {{ actual.punts }}
                            </p>
                            <p v-else>
                                0
                            </p>
                        </th>
                        <th>
                            <p>{{ comptadorEquip1 }}</p>
                        </th>
                    </tr>
                    <tr>
                        <td>Equip 2</td>
                        <th v-for=" actual in res">
                            <p v-if="actual.equipAtacant == 2">
                                {{ actual.punts }}
                            </p>
                            <p v-else>
                                0
                            </p>
                        </th>
                        <th>
                            <p>{{ comptadorEquip2 }}</p>
                        </th>
                    </tr>
                </tbody>
            </table>-->
            </div>
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
</style>