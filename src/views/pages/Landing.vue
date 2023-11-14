<script >
import { useLayout } from '@/layout/composables/layout';
import { computed, onMounted, ref, onBeforeUnmount } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import Button from 'primevue/button';



const cartaUno = ref(true);
export default {
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

        return { activeIndex, tabs, images, setActiveIndex, smoothScroll, cambiarCarta, cartaUno, logoUrl };
    }
};
</script>

<template>
    <div class="surface-0 flex justify-content-center">
        <div id="home" class="landing-wrapper overflow-hidden">
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
                            <a @click="smoothScroll('#precios')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                                <span>Precios</span>
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

            <!-- DIV PARA EL HOME -->
            <div id="hero" class="flex flex-column pt-4 px-4 lg:px-8 overflow-hidden" style="background-image: url('/demo/images/landing/2.jpeg'); background-size: cover; background-position: center; height: 100vh">
                <div class="mx-4 md:mx-8 mt-0 md:mt-4">
                    <h1 class="texto-blanco text-6xl font-bold line-height-2"><span class="font-light block texto-blanco">Explora el lujo auténtico </span>y el encanto en el Hotel Buena Estancia</h1>
                    <p class="font-normal text-2xl line-height-3 md:mt-3 texto-blanco">Donde cada hospedaje es una experiencia inolvidable.</p>
                    <Button label="Más información" class="p-button-rounded text-xl border-none mt-5 font-normal line-height-3 px-3"></Button>
                </div>
            </div>
            <!--fin del div-->

            <div id="precios" class="tabview-wrapper">
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

            <!--  -->
            <div id="pricing" class="py-4 px-4 lg:px-8 my-2 md:my-4">
                <div class="text-center">
                    <h2 class="text-900 font-normal mb-2">Matchless Pricing</h2>
                    <span class="text-600 text-2xl">Amet consectetur adipiscing elit...</span>
                </div>

                <div class="grid justify-content-between mt-8 md:mt-0">
                    <div class="col-12 lg:col-4 p-0 md:p-3">
                        <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                            <h3 class="text-900 text-center my-5">Free</h3>
                            <img src="/demo/images/landing/free.svg" class="w-10 h-10 mx-auto" alt="free" />
                            <div class="my-5 text-center">
                                <span class="text-5xl font-bold mr-2 text-900">$0</span>
                                <span class="text-600">per month</span>
                                <Button label="Get Started" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-5 list-none p-0 flex text-900 flex-column">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                        <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                            <h3 class="text-900 text-center my-5">Startup</h3>
                            <img src="/demo/images/landing/startup.svg" class="w-10 h-10 mx-auto" alt="startup" />
                            <div class="my-5 text-center">
                                <span class="text-5xl font-bold mr-2 text-900">$1</span>
                                <span class="text-600">per month</span>
                                <Button label="Try Free" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-5 list-none p-0 flex text-900 flex-column">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-12 lg:col-4 p-0 md:p-3 mt-4 md:mt-0">
                        <div class="p-3 flex flex-column border-200 pricing-card cursor-pointer border-2 hover:border-primary transition-duration-300 transition-all" style="border-radius: 10px">
                            <h3 class="text-900 text-center my-5">Enterprise</h3>
                            <img src="/demo/images/landing/enterprise.svg" class="w-10 h-10 mx-auto" alt="enterprise" />
                            <div class="my-5 text-center">
                                <span class="text-5xl font-bold mr-2 text-900">$999</span>
                                <span class="text-600">per month</span>
                                <Button label="Get a Quote" class="block mx-auto mt-4 p-button-rounded border-none ml-3 font-light line-height-2 bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-5 list-none p-0 flex text-900 flex-column">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Responsive Layout</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Unlimited Push Messages</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">50 Support Ticket</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl line-height-3">Free Shipping</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

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
                            <h5 class="ml-8 rol1"><span class="colored-text">Sockets Manager: </span><span class="colored-text2">(Sockets.io, Express.js) </span>Irma Michelle Ayala Vázquez</h5>
                            <h5 class="ml-8 rol1"><span class="colored-text">Sockets Manager: </span><span class="colored-text2">(Sockets.io, Express.js) </span>Pedro Octavio Culebro Prado</h5>
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


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.tabview-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.content-wrapper {
    width: 80vw;
    max-width: 1200px;
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