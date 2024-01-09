# Documentació bàsica del projecte
Ha d'incloure, com a mínim
## Instruccions per crear un entorn de desenvolupament
  - eines
  - plugins
  - ...

## Instruccions per desplegar el projecte a producció
Quins fitxers s'han d'editar i com (típicament per connectar la BD etc...)

## Instruccions per seguir codificant el projecte
eines necessaries i com es crea l'entorn per que algú us ajudi en el vostre projecte.

## API / Endpoints / punts de comunicació
Heu d'indicar quins són els punts d'entrada de la API i quins són els JSON que s'envien i es reben a cada endpoint

#### Laravel API per a demanar pregunta aleatoria
- nom API: `getPregunta`
- method: `POST`
- body:
  - `dificultat`: 1, 2 o 3
  - `categoria`: 1, 2, 3, 4, 5, o 6
  - `preguntesAnteriors`: array de ids de preguntes que ja ha rebut en la partida, per a no repetir preguntes

**Exemple: (local)**
```javascript
const response = await fetch('http://localhost:8000/api/getPregunta', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        dificultat: 1,
        categoria: 4,
        preguntesAnteriors: [4, 16, 6]
    }),
});
```

#### Sockets Node
El servidor de node guardarà el següent objecte i l'anirà actualitzant:
```javascript
const sales = [
  {
    jugadors: [
                {
                  nom: nom,
                  id: socket.id, // El id del socket del jugador
                  equip: 1, // o 2
                  baseActual: 0, // Quan els jugadors avancin de base, s'actualitzarà
                  votacioBase: null, // La votacio sobre la dificultat (1, 2 o 3)
                  votacioResposta: null // La votació sobre la resposta correcta (0, 1, 2 o 3)
                },
                {...} // Més jugadors
              ],
    equips: [
              { nJugadors: 3, punts: 0 },
              { nJugadors: 3, punts: 1 }
            ],
    rondes: [
              {equipAtacant: 1, punts: 0},
              {equipAtacant: 2, punts: 1},
              {...} // Més rondes
            ],
    totalVots: 0,
    equipAtacant: 0, // 1 o 2
    categoria: 1, // 1-6
    preguntaActual: null,
    resultatsActuals: null,
    nomSala: "Sala 1",
    jugadorsBanqueta: [],
    jugadorsCamp: [],
    outs: 0,
    preguntesAnteriors: []
  },
  {...} // Més sales
]
```


**Diagrama Connexió NODE:**
![MathBall drawio](https://github.com/inspedralbes/tr2-multiplicat-dawtr2g4/assets/90318659/92659794-ab21-4488-8b5a-7e3f5c9d54a1)
