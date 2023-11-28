<template>
    <div>
        <footer>
            <div class="footer">
                <div class="footer__section">
                    <h3>Contacto</h3>
                    <p>Email: info@smq.com</p>
                    <p>Teléfono: +34 456 7890</p>
                </div>
                <div class="footer__section">
                    <h3>Síguenos</h3>
                    <p>Síguenos en redes sociales para obtener las últimas actualizaciones y ofertas.</p>
                    <div class="social-icons">
                        <a href="#">
                            <img class="social-icons__logos" src="#" alt="Facebook">
                        </a>
                        <a href="#">
                            <img class="social-icons__logos" src="#" alt="Instagram">
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer {
    background-color: var(--rojo);
    color: #fff;
    padding: 20px 0;
    margin-top: 100px;
    font-size: .75em;
}

.footer {
    max-width: 720px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.footer__section h3 {
    color: #fff;
    font-size: 1.2em;
    padding-bottom: 10px;
}

.footer__section p {
    margin: 10px 0;
}
</style>