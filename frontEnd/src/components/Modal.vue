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
    <div :class="['modal', returnModal(pantallaActual)]">
      <header class="modal-header">
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
      <section class="modal-body">
        <div v-if="pantallaActual == 1">
          <p>MathBall és un joc cooperatiu per aprendre matemàtiques que s'inspira en les regles del beisbol.</p>
          <p>El primer que hauràs de fer un cop hagis entrat a una sala és <strong>unir-te a un dels dos equips</strong>.
          </p>
        </div>
        <div v-if="pantallaActual == 2">
          <p>Aquesta és la pantalla principal del joc.</p>
          <p>El teu objectiu és que <strong>el teu equip guanyi 5 punts</strong> abans que l'equip contrari.</p>
        </div>
        <div v-if="pantallaActual == 3">
          <p>El teu equip pot estar <strong>atacant</strong> o <strong>defensant</strong>.</p>
          <p>Aquests rols canviaran al llarg de tota la partida.</p>
          <p>Aquí pots veure quins rols tenen els equips en cada moment.</p>
        </div>
        <div v-if="pantallaActual == 4">
          <p>El camp de joc està format per quatre bases disposades en forma de diamant.</p>
          <p>Quan el teu equip estigui atacant heu d'aconseguir que el màxim nombre de jugadors possible trepitgi totes
            les bases en sentit antihorari fins arribar a la quarta base.</p>
          <p>Quan un jugador arriba a <strong>la quarta base</strong> el vostre equip guanya un punt.</p>
        </div>
        <div v-if="pantallaActual == 5">
          <p>Al principi del torn, cada membre de l’equip que ataca decideix de manera individual <strong>les bases que
              tots els jugadors que es troben al terreny de joc avançaran</strong>: una, dues o tres bases.</p>
          <p>L'opció més votada serà l'escollida.</p>
          <p>L'equip defensor ha d'esperar la decisió de l'equip atacant.</p>
        </div>
        <div v-if="pantallaActual == 6">
          <p>Tot seguit apareixerà una <strong>pregunta amb quatre possibles respostes</strong>.</p>
          <p>Tant els membres de l'equip atacant com de l'equip defensor l'han de respondre de manera individual.</p>
          <p>La <strong>dificultat de la pregunta</strong> depèn del <strong>número de bases</strong> que l'equip atacant
            vol que els seus jugadors es
            moguin: 1 base (FÀCIL), 2 bases (NORMAL), 3 bases (DIFÍCIL). </p>
        </div>
        <div v-if="pantallaActual == 7">
          <p>Si la resposta correcta rep <strong>més vots de l'equip atacant</strong> o rep <strong>el mateix número de
              vots</strong> dels dos equips el
            jugador es mourà tantes bases com havien escollit i un dels jugadors que es troba a la banqueta salta al
            terreny de joc.</p>
        </div>
        <div v-if="pantallaActual == 8">
          <p>Per contra, si la resposta correcta rep <strong>més vots de l'equip defensor</strong> el jugador és eliminat,
            es suma un out
            al marcador i un dels jugadors que es troba a la banqueta salta al terreny de joc.</p>
        </div>
        <div v-if="pantallaActual == 9">
          <p>Els equips <strong>canvien de rol al terreny de joc</strong> quan es produeixen tres outs o no queda cap
            jugador a la banqueta
            que pugui batre.</p>
        </div>
        <div v-if="pantallaActual == 10">
          <p>Per últim, tingueu en compte que arribarà un moment en el que <strong>hi haurà més d'un jugador</strong> al
            terreny de joc.
          </p>
          <p>Quan això passi haureu de respondre <strong>una pregunta per cada jugador</strong> que es troba sobre el camp
            però el temps
            per respondre sempre serà el mateix.</p>
          <p><strong>Cada pregunta està associada a un jugador</strong>. Si l'equip atacant encerta la pregunta per
            majoria aquell jugador avançarà a les següents bases. En canvi, si l'equip defensor encerta la pregunta per
            majoria aquell jugador serà eliminat i es sumarà un out.</p>
          <p>Si decidiu avançar les bases d'una en una la dificultat de les preguntes serà fàcil però haureu de respondre
            moltes preguntes alhora.</p>
          <p>En canvi, si decidiu avançar les bases de dos en dos o de tres en tres la dificultat de les preguntes serà
            major però haureu de respondre menys preguntes a la vegada.</p>
        </div>
      </section>
      <footer class="modal-footer">
        <div>
          <button v-for="n in 10"
            :class="['tutorial_screen_button', n == pantallaActual ? 'tutorial_screen_button--selected' : '']"
            @click="canviarPantallaActual(n)"></button>
        </div>
        <div class="buttons_container">
          <Button @click="canviarPantallaActual(pantallaActual - 1)" severity="primary" raised size="medium"
            label="ANTERIOR" />

          <Button v-if="pantallaActual == 10" @click="close" severity="primary" raised size="medium" label="FINALITZAR" />
          <Button v-else @click="canviarPantallaActual(pantallaActual + 1)" severity="primary" raised size="medium"
            label="SEGÜENT" />
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@font-face {
  font-family: Avenir;
  src: url('/fonts/Avenir_Regular.ttf');
}

p {
  line-height: 1.75;
}

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

.modal-body {
  position: relative;
  padding: 0px 40px;
}
.modal-body div {
  font-family: Avenir;
}

.modal-body>p {
  margin: 25px 0px;
  font-size: 1.2em;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-footer>div {
  margin: 5px auto;
}

.modal-footer Button {
  width: 150px;
  margin: 5px;
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

.modal-10 {
  width: 65%;
}
</style>