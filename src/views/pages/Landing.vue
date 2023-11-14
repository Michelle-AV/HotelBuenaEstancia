  <script>
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import Button from 'primevue/button';

import icono1 from '/demo/images/landing/star.png';
import icono2 from '/demo/images/landing/star-fill.png';
import icono3 from '/demo/images/landing/star.png';

export default {
    data() {
        return {
            componentsData: [
                { id: 1, title: 'Buena elección de hotel', text: 'Nuestro hotel ofrece una experiencia inigualable gracias a su excepcional ubicación.', circleColor: '#FDB62F', backgroundColor: '#FFFFFF', icon: icono1 },
                {
                    id: 2,
                    title: 'Servicio de clase mundial',
                    text: 'Proporcionar un servicio al cliente de primera clase, asegurando que cada estancia sea cómoda, relajante y memorable.',
                    circleColor: '#FFFFFF',
                    backgroundColor: '#FDB62F',
                    icon: icono2
                },
                {
                    id: 3,
                    title: 'El mejor precio garantizado',
                    text: 'Tarifas competitivas sin comprometer la calidad, asegurando que los viajeros disfruten de un alojamiento superior y comodidades de primera a un precio accesible.',
                    circleColor: '#FDB62F',
                    backgroundColor: '#FFFFFF',
                    icon: icono3
                }
            ]
        };
    },

    setup() {
        const { layoutConfig } = useLayout();

        const smoothScroll = (id) => {
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        };

        onMounted(() => {
            (function (d, m) {
                var kommunicateSettings = { appId: '855b06296d3f97ea04a3408a6dc3deee', popupWidget: false, automaticChatOpenOnNavigation: true };
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
                var h = document.getElementsByTagName('head')[0];
                h.appendChild(s);
                window.kommunicate = m;
                m._globals = kommunicateSettings;
            })(document, window.kommunicate || {});
        });

        const cartaUno = ref(true);

        async function cambiarCarta() {
            cartaUno.value = !cartaUno.value;
        }

        const logoUrl = computed(() => {
            return `layout/images/${layoutConfig.darkTheme.value ? 'BE-logo-dark' : 'BE-logo-light'}.png`;
        });

        const activeIndex = ref(0);
        const tabs = ref([
            {
                title: 'Habitación Simple',
                content: `
    Nuestra habitación 'Simple' es la elección perfecta para el viajero solitario que busca comodidad, privacidad y elegancia. Desde el momento en que entres, te sentirás envuelto en un ambiente de relajación y estilo.
 `,
                image: '/demo/images/landing/Simple.jpeg'
            },
            {
                title: 'Habitación Dúo',
                content: `Nuestra habitación 'Duo' es la elección perfecta para una pareja que busca comodidad, privacidad y elegancia. Desde el momento en que entren, se sentirán envueltos en un ambiente de relajación y estilo.`,
                image: '/demo/images/landing/Duo.jpeg'
            },
            {
                title: 'Habitación Doble',
                content: `Nuestra habitación 'Doble' es la elección perfecta para grupos o familias de hasta cuatro personas que buscan comodidad, privacidad y elegancia en un ambiente relajado. Desde el momento en que ingreses, te sumergirás en una atmósfera de tranquilidad y estilo que hará que tu estadía sea inolvidable.`,
                image: '/demo/images/landing/Doble.jpeg'
            }
        ]);
        const images = ref(tabs.value.map((tab) => tab.image));
        let interval;

        const startRotation = () => {
            interval = setInterval(() => {
                activeIndex.value = (activeIndex.value + 1) % tabs.value.length;
            }, 8000);
        };

        const stopRotation = () => {
            clearInterval(interval);
        };

        const setActiveIndex = (index) => {
            activeIndex.value = index;
            stopRotation();
            startRotation();
        };

        onMounted(startRotation);
        onBeforeUnmount(stopRotation);

        return { activeIndex, tabs, images, setActiveIndex, smoothScroll, cambiarCarta, cartaUno, logoUrl, useLayout };
    }
};
</script>

<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
            <!-- TopBar -->
            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
                <!-- <a class="flex align-items-center" href="#"> <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-900 font-medium text-2xl mr-8">Hotel BUES</span> </a> -->
                <a class="flex align-items-center" href="/">
                    <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-2 lg:mr-4" />
                    <!-- <span class="text-900 font-medium text-2xl" style="white-space: nowrap;">Hotel Buena Estancia</span> -->
                    <!-- <span class="text-900 font-medium text-2xl mr-7 ml-2" style="white-space: nowrap;">Hotel Buena Estancia</span> -->
                    <span class="text-900 font-medium text-2xl mr-7 ml-2" style="white-space: nowrap">Hotel BE</span>
                </a>

                <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                    <i class="pi pi-bars text-4xl"></i>
                </a>
                <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
                    <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                        <li>
                            <a @click="smoothScroll('#hero')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Home</span>
                            </a>
                        </li>

                        <li>
                            <a @click="smoothScroll('#somos')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Sobre nosotros</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#Habitaciones')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Habitaciones</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#servicios')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Servicios</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#contactus')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Contacto</span>
                            </a>
                        </li>
                    </ul>
                    <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                        <!-- <Button label="Login" class="p-button-text p-button-rounded border-none font-light line-height-2 text-blue-500"></Button> -->
                        <router-link to="/auth/login" class="p-button p-button-text p-button-rounded border-none font-light line-height-2">
                            <strong>Login</strong>
                        </router-link>
                        <!-- <Button label="Register" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-blue-500"></Button> -->
                    </div>
                </div>
            </div>
            <!-- TopBar Close -->

            <!-- Home -->
            <div id="hero" class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden" style="background-image: url('/demo/images/landing/2.jpeg'); background-size: cover; background-position: center; height: 100vh">
                <div class="mx-4 md:mx-8 mt-0 md:mt-4">
                    <h1 class="texto-blanco text-6xl font-bold line-height-2"><span class="font-light block texto-blanco">Explora el lujo auténtico </span>y el encanto en el Hotel Buena Estancia</h1>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 texto-blanco">Donde cada hospedaje es una experiencia inolvidable.</p>
                    <Button label="Más información" class="p-button-rounded text-xl border-none mt-5 font-normal line-height-3 px-3"></Button>
                </div>
            </div>
            <!--Home Close-->

            <!-- HabitacionesComponent -->
            <div id="Habitaciones" class="tabview-wrapper">
                <div class="content-wrapper">
                    <div class="card">
                        <div class="card-left">
                            <transition name="fade" mode="out-in">
                                <img :src="images[activeIndex]" :alt="'Image ' + (activeIndex + 1)" :key="images[activeIndex]" />
                            </transition>
                        </div>
                        <div class="tab-lines" @click="changeTab">
                            <div class="tab-line" v-for="(tab, index) in tabs" :key="index" :class="{ active: activeIndex === index }" @click.stop="setActiveIndex(index)"></div>
                        </div>
                        <div class="card-right">
                            <transition name="fade" mode="out-in">
                                <div :key="activeIndex">
                                    <h3>{{ tabs[activeIndex].title }}</h3>
                                    <p>{{ tabs[activeIndex].content }}</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>

            <!-- HabitacionesComponent Close -->

            <!-- ServiciosComponent -->
            <div id="servicios" class="container">
                <h1 style="margin-bottom: -200px" class="text-6xl font-bold line-height-2">Conoce nuestros servicios</h1>

                <div class="card__container">
                    <article class="card__article">
                        <img src="/demo/images/landing/Lavanderia.jpeg" alt="image" class="card__img" />

                        <div class="card__data">
                            <span class="card__description">Eficiente, cómodo, rápido, impecable.</span>
                            <h2 class="card__title">Lavanderia</h2>
                            <a href="#" class="card__button">8:00 a.m. - 8:00 p.m.</a>
                        </div>
                    </article>

                    <article class="card__article">
                        <img src="/demo/images/landing/Buffet.jpeg" alt="image" class="card__img" />

                        <div class="card__data">
                            <span class="card__description">Variado, delicioso, fresco, conveniente.</span>
                            <h2 class="card__title">Buffet</h2>
                            <a href="#" class="card__button">7:00 a.m. - 9:00 p.m.</a>
                        </div>
                    </article>

                    <article class="card__article">
                        <img src="/demo/images/landing/Gimnasio.jpeg" alt="image" class="card__img" />

                        <div class="card__data">
                            <span class="card__description">Moderno, equipado, accesible.</span>
                            <h2 class="card__title">Gimnasio</h2>
                            <a href="#" class="card__button">6:00 a.m. - 10:00 p.m.</a>
                        </div>
                    </article>
                </div>
            </div>
            <!-- ServiciosComponent Close  -->

            <!--  -->
            <div id="hero" class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden" style="background-image: url('/demo/images/landing/exterior.jpeg'); background-size: cover; background-position: center; height: 100vh">
                <div class="components-container">
                    <div class="component-item" v-for="component in componentsData" :key="component.id" :style="{ backgroundColor: component.backgroundColor }">
                        <div class="circle" :style="{ backgroundColor: component.circleColor, boxShadow: '0 2px 4px rgba(0,0,0,0.25)' }">
                            <img class="icon-image" :src="component.icon" alt="Icon" />
                        </div>
                        <div class="content">
                            <h1>{{ component.title }}</h1>
                            <p>{{ component.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--  -->

            <!-- AboutUs -->
            <div id="somos" class="py-4 px-4 mx-0 mt-8 lg:mx-8 somos">
                <div class="card col-11 grid my-8 pt-2 md:pt-8">
                    <div class="col-12 lg:col-6 my-auto flex flex-column text-center lg:text-left lg:align-items-start">
                        <h1 class="ml-7 mt-5 heading">¿Quíenes somos?</h1>
                        <div class="ml-8 rectangle"></div>

                        <p class="ml-8 parrafo">
                            Estudiantes de la Lic. en Ingeniería en Desarollo de Tecnologías y Software, con una gran pasión compartida por la tecnología y una innata dedicación a la resolución de problemas de manera innovadora.
                        </p>
                        <br />
                        <h2 class="ml-8 mt-3 school">Universidad Autónoma de Chiapas</h2>
                        <div v-if="cartaUno === true">
                            <h5 class="ml-8 rol1"><span class="colored-text">Backend: </span><span class="colored-text2">(Java, PostgreSQL) </span>Lizeth Guadalupe Rodríguez Rodríguez</h5>
                            <h5 class="ml-8 rol1 front"><span class="colored-text">Frontend: </span><span class="colored-text2">(Vue, Node.js) </span>José María Padilla Fernández</h5>
                        </div>
                        <div v-else-if="cartaUno === false">
                            <h5 class="ml-8 rol1"><span class="colored-text">Server Manager: </span><span class="colored-text2">(Sockets.io, Express.js) </span>Irma Michelle Ayala Vázquez</h5>
                            <h5 class="ml-8 rol1"><span class="colored-text">Server Manager: </span><span class="colored-text2">(Sockets.io, Express.js) </span>Pedro Octavio Culebro Prado</h5>
                            <h5 class="ml-8 rol1 front"><span class="colored-text">IA's Manager: </span><span class="colored-text2">(Kommunicate's Model) </span>Braulio Coutiño Morales</h5>
                        </div>
                    </div>

                    <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 p-0 fondo-img">
                        <img v-if="cartaUno === true" src="/demo/images/landing/aboutus1.2.png" class="w-9" alt="mockup" />
                        <img v-else-if="cartaUno === false" src="/demo/images/landing/aboutus2.png" class="w-7 img2" alt="mockup" />
                    </div>
                </div>
            </div>

            <div v-if="cartaUno === true" class="buttonsA">
                <Button icon="pi pi-chevron-left" class="nextB" text rounded aria-label="Filter" size="large" disabled />
                <Button icon="pi pi-chevron-right" class="nextB" text rounded aria-label="Filter" size="large" @click="cambiarCarta()" />
            </div>

            <div v-else-if="cartaUno === false" class="buttonsA">
                <Button icon="pi pi-chevron-left" class="nextB" text rounded aria-label="Filter" size="large" @click="cambiarCarta()" />
                <Button icon="pi pi-chevron-right" class="nextB" text rounded aria-label="Filter" size="large" disabled />
            </div>
            <!-- AboutUs Close -->
            <div id="contactus" class="py-4 px-4 mx-0 mt-8 lg:mx-8">
                <div class="grid justify-content-between">
                    <div class="col-12 md:col-2" style="margin-top: -1.5rem">
                        <a @click="smoothScroll('#home')" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                            <img :src="logoUrl" alt="footer sections" width="65" height="40" class="mr-2" />
                            <h4 class="font-medium text-3xl text-900">Hotel BE</h4>
                        </a>
                    </div>
                    <div class="col-12 md:col-10 lg:col-7">
                        <div class="grid md:flex md:justify-end ml-8">
                            <div class="col-12 md:col-3 mt-4 md:mt-0 text-left w-full p-0">
                                <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Preguntas Frecuentes</h4>
                                <router-link to="/test" class="line-height-3 text-xl block cursor-pointer mb-2 text-700"> <i class="pi pi-question-circle"></i> FAQ </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.somos {
    display: flex;
    align-items: center;
    justify-content: center;
}
.heading {
    font-size: 4em;
    color: #2d2e8b;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
}
.rectangle {
    width: 200px;
    height: 10px;
    background-color: #ff7f32;
    margin-top: 10px;
}

.parrafo {
    font-size: 15px;
    color: #181717;
    font-family: 'Poppins', sans-serif;
    width: 50rem;
    margin-top: 30px;
}

.school {
    font-size: 1.5em;
    color: #2d2e8b;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
}

.rol1 {
    font-size: 15px;
    color: #181717;
    font-family: 'Poppins', sans-serif;
    width: 50rem;
    margin-top: 20px;
}

.front {
    margin-top: 0px;
    margin-bottom: 100px;
}
.colored-text {
    color: #d16724;
    font-weight: bold;
}
.colored-text2 {
    color: #2d2e8b;
    font-weight: bold;
}

.fondo-img {
    position: absolute;
    margin-left: 34%;
    margin-top: -1.5%;
}
.buttonsA {
    position: absolute;
    margin-left: 50%;
    margin-top: -4%;
    transition: opacity 0.5s;
}
.img2 {
    margin-top: -7.5%;
}
</style>

<style scoped>
h5 {
    color: white;
}

.texto-blanco {
    color: white;
}
</style>
<!-- Style tab-habitaciones -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.tabview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
}

.content-wrapper {
    width: 100vw;
    max-width: 1600px;
    margin: auto;
    font-family: 'Poppins', sans-serif;
}

.card {
    display: flex;
    position: relative;
    width: 100%;
    max-height: 1200px;
}

.card-left {
    width: 50%;
    overflow: hidden;
    margin-left: 0px;
}

.card-left img {
    width: 100%;
    object-fit: cover;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
}

.tab-lines {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
}

.tab-line {
    flex-grow: 1;
    width: 4px;
    background: #ccc;
}

.tab-line.active {
    background: #2d2e8b;
}

.card-right {
    width: 50%;
    padding: 60px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
<!-- Style servicios -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

:root {
    --first-color: #ff7f32;
    --title-color: hsl(0, 0%, 15%);
    --text-color: hsl(0, 0%, 35%);
    --body-color: hsl(0, 0%, 95%);
    --container-color: hsl(0, 0%, 100%);
    --body-font: 'Poppins', sans-serif;
    --h2-font-size: 1.25rem;
    --small-font-size: 0.813rem;
}

@media screen and (min-width: 1120px) {
    :root {
        --h2-font-size: 1.5rem;
        --small-font-size: 0.875rem;
    }
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    font-family: var(--body-font);
    background-color: var(--body-color);
    color: var(--text-color);
}

img {
    display: block;
    max-width: 100%;
    height: auto;
}

.container {
    display: grid;
    place-items: center;
    margin-inline: 1.5rem;
    padding-block: 5rem;
}

.card__container {
    display: grid;
    row-gap: 3.5rem;
}

.card__article {
    position: relative;
    overflow: hidden;
}

.card__img {
    width: 328px;
    border-radius: 1.5rem;
}

.card__data {
    width: 280px;
    background-color: var(--container-color);
    padding: 1.5rem 2rem;
    box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.15);
    border-radius: 1rem;
    position: absolute;
    bottom: -9rem;
    left: 0;
    right: 0;
    margin-inline: auto;
    opacity: 0;
    transition: opacity 1s 1s;
}

.card__description {
    display: block;
    font-size: var(--small-font-size);
    margin-bottom: 0.25rem;
}

.card__title {
    font-size: var(--h2-font-size);
    font-weight: 500;
    color: var(--title-color);
    margin-bottom: 0.75rem;
}

.card__button {
    text-decoration: none;
    font-size: var(--small-font-size);
    font-weight: 500;
    color: var(--first-color);
}

.card__button:hover {
    text-decoration: underline;
}

.card__article:hover .card__data {
    animation: show-data 1s forwards;
    opacity: 1;
    transition: opacity 0.3s;
}

.card__article:hover {
    animation: remove-overflow 2s forwards;
}

.card__article:not(:hover) {
    animation: show-overflow 2s forwards;
}

.card__article:not(:hover) .card__data {
    animation: remove-data 1s forwards;
}

@keyframes show-data {
    50% {
        transform: translateY(-10rem);
    }
    100% {
        transform: translateY(-7rem);
    }
}

@keyframes remove-overflow {
    to {
        overflow: initial;
    }
}

@keyframes remove-data {
    0% {
        transform: translateY(-7rem);
    }
    50% {
        transform: translateY(-10rem);
    }
    100% {
        transform: translateY(0.5rem);
    }
}

@keyframes show-overflow {
    0% {
        overflow: initial;
        pointer-events: none;
    }
    50% {
        overflow: hidden;
    }
}

@media screen and (max-width: 340px) {
    .container {
        margin-inline: 1rem;
    }

    .card__data {
        width: 250px;
        padding: 1rem;
    }
}

@media screen and (min-width: 768px) {
    .card__container {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.5rem;
    }
}

@media screen and (min-width: 1120px) {
    .container {
        height: 100vh;
    }

    .card__container {
        grid-template-columns: repeat(3, 1fr);
    }
    .card__img {
        width: 348px;
    }
    .card__data {
        width: 316px;
        padding-inline: 2.5rem;
    }
}
</style>
<!-- Style StarComponent -->
<style scoped>
.components-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.component-item {
    width: 27vw;
    height: flex;
    border-radius: 10px;
    overflow: visible;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 50px;
    padding-left: 15px;
    padding-right: 15px;

    padding-bottom: 20px;
}

.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -25px;
    z-index: 1;
}

.icon-image {
    max-width: 40%;
}

.content {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    z-index: 0;
}

h1 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
}

p {
    font-size: 1em;
}
</style>
