<template>
    <div>
        <div class="cont">
            <h1>Normes del Joc "MathStrike"</h1>

            <h2>Objectiu del Joc:</h2>
            <p>Anotar la major quantitat de carreres possible en respondre preguntes matemàtiques correctament.</p>

            <h2>Inici del Joc:</h2>
            <p>Es tria aleatòriament un equip per començar com a atacant.</p>

            <h2>Torn d'Atac:</h2>
            <ol>
                <li>L'equip atacant tria quantes bases avançar (de 1 a 4) per determinar la dificultat de la pregunta.</li>
                <li>Ambdós equips, atacant i defensor, responen la mateixa pregunta de matemàtiques.</li>
                <li>L'equip que obtingui el major percentatge de resposta correcta guanya.</li>
                <ul>
                    <li>En cas d'empat, l'equip atacant s'emporta la victòria.</li>
                </ul>
            </ol>

            <h2>Resultat del Torn d'Atac:</h2>
            <p>Si l'equip defensor guanya, el batedor és eliminat i l'equip atacant suma un out. Després de tres outs,
                s'intercanvien els rols dels equips.</p>

            <h2>Final del Joc:</h2>
            <p>El joc continua amb torns alternats fins a arribar a un nombre predeterminat d'entrades o rondes.</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.cont {
    margin: 0 auto;
    width: 80%;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #e3e3e3;
    font-family: 'Arial', sans-serif;
    color: #333;
}

h1 {
    font-size: 2em;
    text-align: center;
    margin-bottom: 1em;
}

h2 {
    font-size: 1.5em;
    margin: 1em 0;
    border-bottom: 1px solid #e3e3e3;
}

p, ol, ul {
    font-size: 1em;
    line-height: 1.5;
    margin-bottom: 1em;
}

ol {
    padding-left: 1em;
}

li {
    margin-bottom: 0.5em;
}

</style>