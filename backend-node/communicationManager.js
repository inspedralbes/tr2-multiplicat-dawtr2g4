const fetch = require('node-fetch');
require('dotenv').config();

let apiURL;

if(process.env.NODE_ENV === 'production') {
    apiURL = process.env.PRODUCTION_API_URL;
} else if (process.env.NODE_ENV === 'preproduction') {
    apiURL = process.env.PREPRODUCTION_API_URL;
} else {
    apiURL = process.env.DEVELOPMENT_API_URL;
}

async function getPregunta(dificultat, categoria, preguntesAnteriors) {
    const response = await fetch(apiURL, {
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