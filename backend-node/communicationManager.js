async function getPregunta(dificultat, categoria, preguntesAnteriors) {
    const response = await fetch('http://localhost:8000/api/getPregunta', {
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
    return jsonResponse
}

module.exports = { getPregunta }