<template>
    <div>
        <div class="scoreboard">
            <h2>Resultats Finals</h2>
            <table>
                <thead>
                    <tr>
                        <th>EQUIP</th>
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
            </table>
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
        calcularPuntuacioTotal(idEquip){
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
.scoreboard {
    width: 100%;
    margin: 0 auto;
}

.scoreboard h2 {
    text-align: center;
    margin-bottom: 20px;
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

.scoreboard tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>