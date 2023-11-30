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
                  id: socket.id, // El id del socket del jugador
                  equip: 1, // o 2
                  baseActual: 0, // Quan els jugadors avancin de base, s'actualitzarà
                  votacioBase: null // La votacio sobre la dificultat (1, 2 o 3)
                },
                {...} // Més jugadors
              ],
    votacions: 0, // Per comptar votacions de dificultat i respostes
    jugadorsEquip1: 0, // Total jugadors equip 1
    jugadorsEquip2: 0, // Total jugadors equip 2
    equipVotant: 0, // Equip votant actualment (1 o 2)
    categoria: 1 // Pot ser 1, 2, 3, 4, 5, o 6
  },
  {...} // Més sales
]
```


**Tindrem sockets al servidor NODE per a actualitzar la següent informació:**
- Jugadors s'uneixen als equips:
  - ON: `equip-seleccionat`
  - EMIT: `equips-actualitzats`
- La professora comença la partida:
  - ON: `partida-iniciada`
  - EMIT: `partida-iniciada`
- Començar votacions per a la dificultat de la pregunta
  - ON: `començar-votacio-dificultat`
  - EMIT: `començar-votacio-dificultat`
- Jugadors atacants voten la dificultat de la pregunta:
  - ON: `votacio-dificultat`
- Temporitzador per a votar la dificultat decrementa 1 segon:
  - EMIT: `actualitzar-comptador`
- Tots els jugadors atacants han votat dificultat o el temps s'ha acabat
  - EMIT: `finalitzar-votacio-dificultat`
- Mostrar una nova pregunta a tots els jugadors:
  - EMIT: `nova-pregunta`
- Jugadors voten la resposta a la pregunta
  - ON: `votacio-resposta`
- Mostrar resultats generals de la pregunta a la professora

- Mostrar resposta correcta (o no) a cada alumne

- Actualitzar el terreny de joc


9. ...
10. Mostrar resultats finals de la partida
