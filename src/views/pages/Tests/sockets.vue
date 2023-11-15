<template>
    <a href="/" class="back-button">
            <i class="pi pi-angle-left"></i>
        </a>
    <div class="flex flex-column align-items-center justify-content-center">
        <div class="col-10 mx-auto semi-circle-container mt-5">
            <div class="card card-content">
                <div class="flex align-items-center justify-content-center mt-8" style="padding-top: 30px;">
                    <h1 class="txtcolor1" style="font-size: 4em"><strong>PREGUNTAS FRECUENTES</strong></h1>
                    <!-- <i class="pi pi-question-circle" style="font-size: 2em; vertical-align: middle"></i> -->
                </div>
                <div class="flex align-items-center justify-content-center mt-3">
                    <div class="text-icon-group">
                        <h5 style="color: #ffff">Con respuestas actualizadas y en tiempo real</h5>
                    </div>
                </div>

                <!-- FAQ -->
                <div style="padding-top: 83px;">
                <div class="col-12 mt-5">
                    <div class="card">
                        <Button id="btn1" label="¿Cuántas habitaciones hay libres para hoy?" @click="sendQuestion(1)" />
                        <transition name="fade">
                        <div v-if="currentQuestion === 1" class="response card">
                            <ul>
                                <h6>¡Explora las habitaciones disponibles para reservar el día de hoy! Cada una ha sido preparada con esmero para asegurar una experiencia de descanso y relajación inigualable.</h6>
                                <li v-for="(message, index) in messages" :key="index">Alrededor de {{ message.available_rooms }} habitacion(es) de tipo {{ message.desc_hab }} al momento de realizar esta consulta.</li>
                            </ul>
                        </div>
                    </transition>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button id="btn1" label="¿Qué servicios manejan?" @click="sendQuestion(2)" />
                        <transition name="fade">
                        <div v-if="currentQuestion === 2" class="response card">
                            <ul>
                                <h6>
                                    ¡Bienvenido a la comodidad y el lujo sin precedentes! Nuestro hotel está dedicado a ofrecer una experiencia inigualable con una amplia gama de servicios pensados para cada uno de nuestros huéspedes. Entre los
                                    servicios que puedes solicitar se encuentran:
                                </h6>
                                <li v-for="(message, index) in messages" :key="index">El servicio de {{ message.desc_servicio }}, con un precio de ${{ message.precio_servicio }}</li>
                            </ul>
                        </div>
                        </transition>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button id="btn1" label="¿El hotel ofrece algun paquete especial?" @click="sendQuestion(3)" />
                        <transition name="fade">
                        <div v-if="currentQuestion === 3" class="response card">
                            <h6>
                                ¡Claro! Nuestro hotel ofrece paquetes especiales exclusivamente diseñados para los días festivos, brindando a nuestros huéspedes una experiencia festiva única y memorable. Estos paquetes incluyen comodidades y
                                actividades temáticas para que celebres las fiestas en gran estilo, desde cenas de gala hasta entretenimiento en vivo y decoraciones que capturan el espíritu de la temporada. Para más información sobre nuestros
                                paquetes de días festivos y para realizar su reserva, le invitamos a contactar a nuestro equipo de reservaciones o revisar a fondo nuestra página web.
                            </h6>
                        </div>
                        </transition>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button id="btn1" label="¿Qué tipo de habitaciones hay?" @click="sendQuestion(4)" />
                        <transition name="fade">
                        <div v-if="currentQuestion === 4" class="response card">
                            <ul>
                                <h6>
                                    ¡Descubre el espacio perfecto para tu escape ideal! Nuestros tipos de habitaciones están diseñados para proporcionar el máximo confort y estilo, adaptándose a todas tus necesidades. ¡Elige la tuya y vive la
                                    experiencia de hospedaje que siempre has soñado!
                                </h6>
                                <li v-for="(message, index) in messages" :key="index">
                                    Habitación {{ message.desc_hab }} desde ${{ message.precio_hab }} con una cantidad de {{ message.cant_camas }} cama(s) y con espacio hasta para {{ message.cant_personas }} persona(s).
                                </li>
                            </ul>
                        </div>
                        </transition>
                    </div>
                </div>
                <div class="col-12">
                    <div class="card">
                        <Button id="btn1" label="¿Cuál es el proceso a seguir para recibir un reembolso?" @click="sendQuestion(5)" />
                        <transition name="fade">
                        <div v-if="currentQuestion === 5" class="response card">
                            <h6>
                                Para realizar un reembolso, nuestro hotel sigue un proceso claro y sencillo para garantizar la satisfacción del cliente. Si necesita cancelar su reserva, simplemente póngase en contacto con nuestro equipo de atención
                                al cliente con su número de confirmación a la mano. Nuestros representantes revisarán los términos de su tarifa y le guiarán a través de los pasos necesarios para procesar su reembolso. Le recomendamos revisar nuestra
                                política de cancelación y reembolso, ya que puede haber plazos específicos y condiciones para ser elegible para un reembolso completo o parcial. Estamos comprometidos a manejar su solicitud de manera eficiente y a
                                asegurarnos de que su experiencia sea lo más fluida posible.
                            </h6>
                        </div>
                        </transition>
                    </div>
                </div>
                </div>

            </div>
        </div>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
</template>

  <script>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import AppFooter from '@/layout/AppFooter.vue';
import AppConfig from '@/layout/AppConfig.vue';

const { layoutConfig } = useLayout();

export default {
    data() {
        return {
            message: '',
            messages: [],
            currentQuestion: null
        };
    },
    sockets: {
        connect() {
            console.log('Connected to server');
        },
        disconnect() {
            console.log('Disconnected from server');
        },
        'database result'(data) {
            console.log('Datos de la base de datos recibidos:', data);
            this.messages = data;
        }
    },
    computed: {
        logoUrl() {
            return `layout/images/${layoutConfig.darkTheme.value ? 'h-square-white' : 'h-square-dark'}.png`;
        }
    },
    methods: {
        sendMessage(value) {
            if (this.message.trim() !== '') {
                console.log('Sending message:', this.message);
                this.$socket.emit('chat message', this.message);
                this.message = '';
            }
        },

        sendQuestion(questionNumber) {
            this.currentQuestion = questionNumber;
            this.$socket.emit('chat message', questionNumber.toString());
        }
    }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.response {
    margin-top: 1rem;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 5em;
    margin-right: 0.1em;
}

.text-icon-group {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h5 {
    color: #454545;
    margin-top: 0.1em;
}

.semi-circle-container {
    position: relative;
    z-index: 1;
}

.semi-circle-container::before {
    content: '';
    position: absolute;
    width: 1800px;
    height: 800px;
    background: #212267;
    border-radius: 50%;
    top: -230px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
}

.txtcolor1 {
    color: rgb(254, 254, 254);
}
.card-content {
    margin-top: 7%;
}

.flex-column {
    overflow-x: hidden;
}

.card-content {
    z-index: 1;
    position: relative;
    overflow: hidden;
}

.card-content::before {
    content: '';
    position: absolute;
    width: 1800px;
    height: 800px;
    background: #2d2e8b;
    border-radius: 50%;
    top: -320px;
    left: -380px;
    z-index: -1;
    overflow: hidden;
}

.fade-enter-active {
  transition: opacity 1.5s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
    .card{
    border: 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

}
.back-button {
        position: absolute;
        top: 20px;
        left: 20px; 
        font-size: 1.5em;
        color: #FFF;
        text-decoration: none;
        z-index: 10; 
    }
</style>
  

  
