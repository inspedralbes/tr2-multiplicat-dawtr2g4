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
