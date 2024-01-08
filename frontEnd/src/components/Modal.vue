<script>
export default {
  name: 'Modal',
  props: {
    pantallaActual: Number
  },
  methods: {
    close() {
      this.$emit('close');
    },
    canviarPantallaActual(newPantallaActual) {
      if (newPantallaActual >= 1 && newPantallaActual < 11) {
        this.$emit('button-clicked', newPantallaActual);
      }
    },
    returnModal(pantallaActual) {
      return 'modal-' + pantallaActual;
    }
  }
};
</script>

<template>
  <div class="modal-backdrop">
    <!--<div :class="['area', returnArea(pantallaActual)]"></div>-->
    <div :class="['modal', returnModal(pantallaActual)]">
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
      <section class="modal-body">
        <div v-if="pantallaActual == 1">
          <p>MathBall és un joc cooperatiu per aprendre matemàtiques que s'inspira en les regles del beisbol.</p>
          <p>El primer que hauras de fer un cop hagis entrat a una sala és unir-te a un dels dos equips.</p>
        </div>
        <div v-if="pantallaActual == 2">
          <p>Aquesta és la pantalla principal del joc.</p>
          <p>El teu objectiu és que el teu equip guanyi 10 punts abans que l'equip contrari.</p>
        </div>
        <div v-if="pantallaActual == 3">
          <p>El teu equip pot estar batejant o defensant.</p>
          <p>Aquests rols aniràn canviant al llarg de tota la partida.</p>
          <p>Aquí pots veure quins rols tenen els equips en cada moment.</p>
        </div>
        <div v-if="pantallaActual == 4">
          <p>El camp de joc està format per quatre bases disposades en forma de diamant.</p>
          <p>Quan el teu equip estigui batejant heu d'aconseguir que el màxim nombre de jugadors possible trepitgi totes
            les bases en sentit antihorari fins arribar a la quarta base.</p>
          <p>Quan un jugador arriba a la quarta base el vostre equip guanya un punt.</p>
        </div>
        <div v-if="pantallaActual == 5">
          <p>Al principi del torn, cada membre de l’equip que bateja decideix de manera individual quantes bases volen que
            tots els jugadors que es troben al terreny de joc avancin: una, dues o tres bases.</p>
          <p>L'opció més votada serà l'escollida.</p>
          <p>L'equip defensor ha d'esperar a la decisió de l'equip batejador.</p>
        </div>
        <div v-if="pantallaActual == 6">
          <p>Tot seguit apareixerà una pregunta amb quatre possibles respostes.</p>
          <p>Tant els membres de l'equip batejador com de l'equip defensor l'han de respondre de manera individual.</p>
          <p>La dificultat de la pregunta depèn del número de bases que l'equip batejador vol que els seus jugadors es
            moguin: 1 base (FÀCIL), 2 bases (NORMAL), 3 bases (DIFÍCIL). </p>
        </div>
        <div v-if="pantallaActual == 7">
          <p>Si la resposta correcta rep més vots de l'equip batejant o rep els mateix número de vots del dos equips el
            seu jugador es mourà tantes bases com havien escollit i un dels jugadors que es troba a la banqueta salta al
            terreny de joc.</p>
        </div>
        <div v-if="pantallaActual == 8">
          <p>Per contra, si la resposta correcta rep més vots de l'equip defensor el jugador és eliminat, es suma un out
            al marcador i un dels jugadors que es troba a la banqueta salta al terreny de joc.</p>
        </div>
        <div v-if="pantallaActual == 9">
          <p>Els equips canvien de rol al terreny de joc quan es produeixen tres outs o no queda cap jugador a la banqueta
            que pugui batre.</p>
        </div>
        <div v-if="pantallaActual == 10">
          <p>Per últim, tingueu en compte que arribarà un moment en el que hi haurà més d'un jugador al terreny de joc.
          </p>
          <p>Quan això passi haureu de respondre una pregunta per cada jugador que es troba sobre el camp però el temps
            per respondre sempre serà el mateix.</p>
          <p>Si decidiu avançar les bases d'una en una la dificultat de les preguntes serà fàcil però haureu de respondre
            moltes preguntes alhora.</p>
          <p>En canvi, si decidiu avançar les bases de dos en dos o de tres en tres la dificultat de les preguntes serà
            major però haureu de respondre menys preguntes.</p>
        </div>
      </section>

      <footer class="modal-footer">
        <div>
          <button v-for="n in 10" :class="['tutorial_screen_button', n == pantallaActual ? 'tutorial_screen_button--selected' : '']" @click="canviarPantallaActual(n)"></button>
        </div>
        <div class="buttons_container">
          <Button @click="canviarPantallaActual(pantallaActual - 1)" severity="primary" raised size="medium"
            label="ANTERIOR" />
          <Button @click="canviarPantallaActual(pantallaActual + 1)" severity="primary" raised size="medium"
            label="SEGÜENT" />
        </div>
      </footer>
    </div>
  </div>
</template>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: absolute;
  height: fit-content;

  border-radius: 8px;

  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  z-index: 99;
}

.modal-1 {
  width: 20%;
  top: 220px;
  left: 840px;
}

.modal-2 {
  width: 20%;
  top: 260px;
}

.modal-3 {
  width: 78%;
  top: 250px;
  left: 200px;
}

.modal-4 {
  width: 20%;
  top: 268px;
  left: 85px;
}

.modal-5 {
  width: 20%;
  top: 265px;
  left: 1040px;
}

.modal-6 {
  width: 19.5%;
  top: 230px;
  left: 1415px;
}

.modal-7 {
  width: 19.5%;
  top: 260px;
  left: 1440px;
}

.modal-8 {
  width: 50%;
  top: 260px;
  left: 485px;
}

.modal-9 {
  width: 50%;
  top: 600px;
  left: 485px;
}

.modal-header,
.modal-footer {
  padding: 10px 0px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-header>p {
  font-size: 2em;
  margin: 0 20px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-footer > div {
  margin: 5px auto;
}

.modal-footer Button {
  width: 150px;
  margin: 5px;
}

.modal-body {
  position: relative;
  padding: 0px 40px;
}

.btn-close {
  align-self: flex-start;
  border: none;
  font-size: 20px;
  margin: 0px 30px 0;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-body>p {
  margin: 25px 0px;
  font-size: 1.2em;
}

.modal-footer .tutorial_screen_button {
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 50%;
  background-color: #4AAE9B;
}

.modal-footer .tutorial_screen_button--selected {
  width: 30px;
  border-radius: 8px;
}

p {
  line-height: 1.75;
}

.modal-body>.nota {
  margin: 40px 0px;

  text-align: center;
  font-size: 2.5em;
}

.area {
  box-shadow: rgba(204, 204, 204, 1) 0px 0px 1px 2px, rgba(33, 33, 33, 0.6) 0px 0px 0px 5000px;
  position: absolute;
  border-radius: 8px;

}

.area-1 {
  width: 26%;
  height: 51.5%;
  top: 220px;
  left: 320px;
  /*overflow-x: auto;
  display: flex;
  flex-direction: column;*/
  /*box-shadow: rgba(204, 204, 204, 1) 0px 0px 1px 2px, rgba(33, 33, 33, 0.5) 0px 0px 0px 5000px;*/
}

.area-3 {
  width: 78%;
  height: 15%;
  top: 90px;
  left: 200px;
}

.area-4 {
  width: 48.75%;
  height: 59%;
  top: 268px;
  left: 490px;
}

.area-5 {
  width: 19.5%;
  height: 59%;
  top: 265px;
  left: 1450px;
}

.area-6 {
  width: 46%;
  height: 65%;
  top: 230px;
  left: 510px;
}

.area-7 {
  width: 48.75%;
  height: 57%;
  top: 260px;
  left: 490px;
}

.area-8 {
  width: 20%;
  height: 28.5%;
  top: 260px;
  left: 89px;
}

.area-9 {
  width: 19.5%;
  height: 21.5%;
  top: 600px;
  left: 92px;
}

.area-10 {
  width: 45%;
  height: 100%;
}</style>