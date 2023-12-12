const fetch = require('node-fetch');

// let url = "http://mathball.daw.inspedralbes.cat/backend-laravel/public/api/getPregunta";
// let url = "http://tr2g4.daw.inspedralbes.cat/backend-laravel/public/api/getPregunta";
let url = "http://localhost:8000/api/getPregunta";

async function getPregunta(dificultat, categoria, preguntesAnteriors) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            dificultat: dificultat,
            categoria: categoria,
            preguntesAnteriors: preguntesAnteriors
        }),
    });
    const jsonResponse = await response.json()
    console.log(jsonResponse)

    // Afegir index de la resposta correcta a l'objecte
    let indexRespostaCorrecta = jsonResponse.respostes.findIndex(resposta => resposta.correcta === 1)
    jsonResponse.indexRespostaCorrecta = indexRespostaCorrecta
    return jsonResponse
}

module.exports = { getPregunta }