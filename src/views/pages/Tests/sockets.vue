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
            // if (this.message.trim() !== '') {
            //     this.$socket.emit('chat message', this.message);
            //     this.message = '';
            // }}

            // this.$socket.emit('chat message', value);
            if (this.message.trim() !== '') {
                console.log('Sending message:', this.message);
                this.$socket.emit('chat message', this.message);
                this.message = '';
            }
        },

        sendQuestion(questionNumber) {
      // Envia un mensaje al servidor con el número de la pregunta
            this.$socket.emit('chat message', questionNumber.toString());
        }
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <router-link to="/landing" class="flex align-items-center text-center ml-3 mt-3">
                <img :src="logoUrl" alt="Sakai Logo" height="50" class="mr-0 lg:mr-2" />
                <span class="text-900 font-medium text-2xl mr-8">Hotel BUES</span>
            </router-link>
            <h1 class="text-center mt-6">Bienvenido a la sección de Preguntas Frecuentes</h1>
            
            <div class="card col-11 h-100 ml-8">
                <div
                    class="col-12 mt-8 mb-8 p-2 md:p-8"
                    style="border-radius: 20px; background: #CFE9FB"
                >
                    <div class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                        <h3 class="text-gray-900 mb-2">Respuestas del servidor</h3>
                        <!-- <span class="text-gray-600 text-2xl">Peak Interactive</span> -->
                        <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-left text-2xl mt-4" style="max-width: 800px">
                            “Acá irían las respuestas del servidor.”
                        </p>
                    </div>
                </div>
                <div id="app" class="flex justify-content-center mb-3">
                    <!-- <Button id="btn1" severity="info" label="¿Cuántas habitaciones hay libres para hoy?" text raised @click="sendMessage"/> -->
                    
                    <Button id="btn1" severity="info" label="¿Cuántas habitaciones hay libres para hoy?" text raised @click="sendQuestion(1)"/>
                    <Button id="btn2" severity="info" label="¿Que servicios se manejan?" text raised @click="sendQuestion(2)"/>

                    <Button severity="info" label="¿Cúal es el precio de los servicios que manejan?" text raised class="ml-5"/>
                    <Button severity="info" label="¿Qué tipos de habitaciones hay y su precio?" text raised class="ml-5"/>
                    <!-- <input v-model="message" @keyup.enter="sendMessage" />
                    <button @click="sendMessage">Send</button> -->
                </div>
            </div>
        </div>
    </div>
</template>
