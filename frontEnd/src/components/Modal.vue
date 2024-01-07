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
      if (newPantallaActual >= 0 && newPantallaActual < 6) {
        this.$emit('button-clicked', newPantallaActual);
      }
    },
    returnArea(pantallaActual) {
      return 'area-' + pantallaActual;
    },
    returnModal(pantallaActual) {
      return 'modal-' + pantallaActual;
    }
  }
};
</script>

<template>
  <div class="modal-backdrop">
    <div :class="['area', returnArea(pantallaActual)]"></div>
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
          <p>Quan el teu equip estigui batejant heu d'aconseguir que el màxim nombre de jugadors possible trepitgi totes les bases en sentit antihorari fins arribar a la quarta base.</p>
          <p>Quan un jugador arriba a la quarta base el vostre equip guanya un punt.</p>
        </div>
        <div v-if="pantallaActual == 5">
          <p>Al principi del torn, cada membre de l’equip que bateja decideix de manera individual quantes bases volen que tots els jugadors que es troben al terreny de joc avancin: una, dues o tres bases.</p>
          <p>L'opció més votada serà l'escollida.</p>
          <p>L'equip defensor ha d'esperar a la decisió de l'equip batejador.</p>
        </div>
      </section>

      <footer class="modal-footer">
        <button @click="canviarPantallaActual(pantallaActual - 1)">ANTERIOR</button>
        <button @click="canviarPantallaActual(pantallaActual + 1)">SEGÜENT</button>
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

  padding: 20px 0px 20px;

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
  height: 51.5%;
  top: 220px;
  left: 820px;
}

.modal-2 {
  width: 20%;
  height: 56%;
  top: 260px;
}

.modal-3 {
  width: 78%;
  height: 35%;
  top: 250px;
  left: 200px;
}

.modal-4 {
  width: 20%;
  height: 56%;
  top: 260px;
  left: 80px;
}

.modal-5 {
  width: 20%;
  height: 56%;
  top: 260px;
  left: 1005px;
}

.modal-header,
.modal-footer {
  padding: 15px;
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
  margin: 0 25px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 40px;
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
  width: 28.25%;
  height: 51.5%;
  top: 220px;
  left: 280px;
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
  width: 48.5%;
  height: 56%;
  top: 260px;
  left: 475px;
}

.area-5 {
  width: 19.5%;
  height: 56%;
  top: 260px;
  left: 1397px;
}
</style>