# Documentació bàsica del projecte

## Entorn de Desenvolupament

Per a desenvolupar el projecte es recomana utilitzar les següents eines i aplicacions:

| Categoria                                     | Eines                           |
|-----------------------------------------------|---------------------------------|
| Entorn de Desenvolupament Integrat (IDE) | Visual Studio Code  |
| Sistema de Control de Versions                | Git, GitHub                     |
| Gestors de Paquets                            | npm, Composer                   |
| Eines de Base de Dades                        | PhpMyAdmin, Xampp               |
| Eines de Desenvolupament Frontend             | Vue.js DevTools                 |
| Eines de Prova d'API i Clients REST           | Thunder Client                  |
| Configuració d'Entorn i Virtualització        | Docker                          |
| Linters de Codi i Formatejadors               | ESLint, PHP_CodeSniffer         |

## Desplegar el projecte a producció

Per a desplegar el projecte a producció s'han de seguir els següents passos:

1. Copiar el projecte en local:

```
git clone https://github.com/inspedralbes/tr2-multiplicat-dawtr2g4.git
cd tr2-multiplicat-dawtr2g4
```

2. Entrar a la carpeta `backend-laravel` i instal·lar dependències:

```
cd backend-laravel
composer install
```

3. Crear fitxer `.env`:

```
cp .env.example .env
```

4. Emplenar camps corresponents del fitxer `.env`:

```
FRONT_URL=http://{PRODUCTION_URL}

DB_CONNECTION=mysql
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

5. Anar a la carpeta `backend-node` i instal·lar dependències:

```
cd ..
cd backend-node
npm install
```

6. Crear fitxer `.env`:

```
touch .env
```

7. Emplenar fitxer `.env` amb les següents dades substituint `PRODUCTION_URL` per a la URL de la web a producció:

```
NODE_ENV=production
PRODUCTION_API_URL=http://{PRODUCTION_URL}/backend-laravel/public/api/getPregunta
DEVELOPMENT_API_URL=http://127.0.0.1:8000/api/getPregunta
```

8. Entrar a la carpeta `frontend` i instal·lar dependències:

```
cd ..
cd frontend
npm install
```

9. Compilar i minimitzar fitxers de Vue:

```
npm run build
```

10. Crear Base de Dades a un servidor. Les dades d'accés seran allotjades en el fitxer `.env` de Laravel (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` i `DB_PASSWORD`).

11. Emplenar Base de Dades:
    - Enganxar continguts del fitxer `CREATE.SQL`
    - Enganxar continguts del fitxer `INSERT.SQL`

12. Transferir els fitxers al servidor on s'allotjarà la web:
    - Transferir directament les carpetes `backend-laravel` i `backend-node`.
    - Transferir la carpeta `frontend` amb només la carpeta `dist` a dins. 

13. Obrir la consola en el servidor web i engegar el servidor node:

```
cd backend-node
node index.js
```

**I JA ESTÀ TOT LLEST!**


## Instruccions per seguir codificant el projecte

Per a seguir codificant el projecte, és recomanable seguir els següents passos:

1. Seguir els passos 1-8 de la secció **Desplegar el projecte a producció**.
2. Dins la carpeta de Laravel, exporta les taules de la BD (requereix que el Xampp estigui encès):

```
php artisan migrate
```

3. Entra a la BD (potser mitjançant `phpmyadmin`) i emplena la BD enganxant el contingut del fitxer `INSERT.SQL`

4. Dins de la carpeta `backend-laravel`, executar la següent comanda:

```
php artisan serve
```

3. Obrint una altra terminal, dins de la carpeta `backend-node`, engegar el servidor:

```
node index.js
```

4. Obrint una altra terminal, dins la carpeta `frontend`, executa la següent comanda:

```
npm run dev
```

5. Obre una finestra al navegador i enganxa la següent URL per a veure la web: 

```
http://127.0.0.1:5173/
```

## API / Endpoints / punts de comunicació

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
El servidor de node guardarà el següent objecte per a les sales i les anirà actualitzant:
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
    categories: [1, 2], // 1-6
    preguntaActual: null,
    resultatsActuals: null,
    nomSala: "Sala 1",
    jugadorsBanqueta: [],
    jugadorsCamp: [],
    outs: 0,
    preguntesAnteriors: [],
    cronometre: 0,
    tempsVotarResposta: 50
  },
  {...} // Més sales
]
```


**Diagrama Connexió NODE:**
![MathBall drawio](https://github.com/inspedralbes/tr2-multiplicat-dawtr2g4/assets/90318659/92659794-ab21-4488-8b5a-7e3f5c9d54a1)
