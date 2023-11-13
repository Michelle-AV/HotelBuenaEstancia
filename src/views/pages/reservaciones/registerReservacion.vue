<template>
    <div class="p-grid p-fluid">
        <div class="col-12">
            <div class="card">
                <h3 class="mr-8">Registrar Reserva</h3>
                <div class="card">
                    <h6>Buscar un cliente existente</h6>
                    <div class="flex justify-center items-center mt-2">
                        <InputText v-model="telefono" placeholder="Ingrese el número de teléfono" class="mr-2" />
                        <Button icon="pi pi-search" @click="buscarCliente" />
                    </div>
                </div>
                <div class="p-fluid formgrid grid mt-5">
                    <div class="flex flex-column gap-2 col-4">
                        <label for="nombre">Nombre(s)</label>
                        <InputText id="nombre" v-model="nombre" />
                    </div>
                    <div class="flex flex-column gap-2 col-4">
                        <label for="appat">Apellido paterno</label>
                        <InputText id="appat" v-model="appat" />
                    </div>
                    <div class="flex flex-column gap-2 col-4">
                        <label for="apmat">Apellido materno</label>
                        <InputText id="apmat" v-model="apmat" />
                    </div>
                </div>

                <div class="p-fluid formgrid grid mt-1">
                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="correo">Correo electrónico</label>
                        <InputText id="correo" v-model="correo" />
                    </div>
                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="telefonon">Teléfono</label>
                        <InputNumber id="telefonon" v-model="telefonon" />
                    </div>

                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="rfc">RFC</label>
                        <InputText id="rfc" v-model="rfc" />
                    </div>

                    
                </div>

                <div class="flex flex-column gap-2 mt-3">
                    <label for="direccion">Dirección</label>
                        <InputText id="direccion" v-model="direccion" />
                </div>

                    <div class="flex flex-column form grid grid gap-2 col-6 mt-1">
                        <label for="fechaReserva">Fecha de Reserva</label>
                    <Calendar id="fechaReserva" v-model="fechaReserva" selectionMode="range" :manual-input="false" showIcon placeholder="Seleccione un rango de fechas" />
                    </div>
                    
                

                <div class="flex flex-column gap-2 formgrid grid col-3">
                    <label for="numHabitaciones">Número de Habitaciones</label>
                    <InputNumber v-model="numHabitaciones" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="10" @input="setHabitaciones" />
                </div>

                <div v-for="n in numHabitaciones" :key="n" class="p-fluid formgrid grid gap-2 col-12">
                    <div class="flex flex-column items-center gap-2 col-2">
                        <label :for="'habitacion_' + n"> Habitación {{ n }}</label>
                        <InputNumber
                            v-model="personasPorHabitacion[n - 1]"
                            showButtons
                            buttonLayout="vertical"
                            style="width: 4rem"
                            decrementButtonClassName="p-button-secondary"
                            incrementButtonClassName="p-button-secondary"
                            incrementButtonIcon="pi pi-plus"
                            decrementButtonIcon="pi pi-minus"
                            :min="1"
                            :max="4"
                            @click="agregarHabitacion(n, '')"
                        />
                    </div>

                    <div class="flex flex-row gap-4 col-9">
                        <div class="card card-room col-4" v-if="personasPorHabitacion[n - 1] < 2">
                            <img src="https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg" alt="Habitación Simple" />
                            <h5>Simple</h5>
                            <Button :icon="habitacionActiva[n] === 'Simple' ? 'pi pi-check' : 'pi pi-plus'" :class="{ 'p-button-success': habitacionActiva[n] === 'Simple' }" aria-label="Submit" @click="agregarHabitacion(n, 'Simple')" />
                        </div>
                        <div class="card card-room col-4" v-if="personasPorHabitacion[n - 1] < 3">
                            <img src="https://i0.wp.com/presidenteicpuebla.com/wp-content/uploads/2021/10/hoteles-de-lujo-en-puebla-clasica.jpg?fit=1075%2C695&ssl=1" alt="Habitación Duo" />
                            <h5>Duo</h5>
                            <Button :icon="habitacionActiva[n] === 'Duo' ? 'pi pi-check' : 'pi pi-plus'" :class="{ 'p-button-success': habitacionActiva[n] === 'Duo' }" aria-label="Submit" @click="agregarHabitacion(n, 'Duo')" />
                        </div>
                        <div class="card card-room col-4">
                            <img src="https://media-cdn.tripadvisor.com/media/photo-s/07/be/b3/46/hotel-gaythering.jpg" alt="Habitación Doble" />
                            <h5>Doble</h5>
                            <Button :icon="habitacionActiva[n] === 'Doble' ? 'pi pi-check' : 'pi pi-plus'" :class="{ 'p-button-success': habitacionActiva[n] === 'Doble' }" aria-label="Submit" @click="agregarHabitacion(n, 'Doble')" />
                        </div>
                    </div>
                </div>
                <div class="card" v-if="habitacionesSeleccionadas.length">
                    <h5>Habitaciones seleccionadas:</h5>
                    <div class="p-grid">
                        <div class="card col-12" v-if="conteoHabitaciones.Simples > 0">
                            <div class="card-room-selected">
                                <img src="https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg" alt="Habitación Simple" />
                                <div class="habitacion-info">
                                    <h5>Simple</h5>
                                    <p>{{ conteoHabitaciones.Simples }} Habitación(es)</p>
                                </div>
                            </div>
                        </div>
                        <div class="card col-12" v-if="conteoHabitaciones.Duo > 0">
                            <div class="card-room-selected">
                                <img src="https://i0.wp.com/presidenteicpuebla.com/wp-content/uploads/2021/10/hoteles-de-lujo-en-puebla-clasica.jpg?fit=1075%2C695&ssl=1" alt="Habitación Duo" />
                                <div class="habitacion-info">
                                    <h5>Duo</h5>
                                    <p>{{ conteoHabitaciones.Duo }} Habitación(es)</p>
                                </div>
                            </div>
                        </div>
                        <div class="card col-12" v-if="conteoHabitaciones.Dobles > 0">
                            <div class="card-room-selected">
                                <img src="https://media-cdn.tripadvisor.com/media/photo-s/07/be/b3/46/hotel-gaythering.jpg" alt="Habitación Doble" />
                                <div class="habitacion-info">
                                    <h5>Doble</h5>
                                    <p>{{ conteoHabitaciones.Dobles }} Habitación(es)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Button label="Revisar disponibilidad" @click="revisarReserva" :disabled="!validarReserva()" class="mt-5" />
            </div>
        </div>

        <!-- Ventana -->
        <Dialog v-model:visible="mostrarDialog" :style="{width: '90vw'}" modal>
    <template #header>
        <h3>Habitaciones disponibles</h3>
    </template>
    <template #content>
    <h4>Seleccione las habitaciones a asignar:</h4>
    <div v-for="habitacion in habitacionesSeleccionadas" :key="habitacion.id">
        <!-- Agrega esto para probar si el loop funciona -->
        <p>Habitación seleccionada: {{ habitacion }}</p>
    </div>
</template>

    <template #footer>
        <Button label="Cerrar" icon="pi pi-check" @click="mostrarDialog = false" />
    </template>
</Dialog>

    </div>
</template>

<script>
import { ref, computed } from 'vue';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
    components: {
        InputText,
        Button,
        Calendar,
        InputNumber,
        Dialog
    },
    setup() {
        const telefono = ref('');
        const nombre = ref('');
        const appat = ref('');
        const apmat = ref('');
        const correo = ref('');
        const direccion = ref('');
        const telefonon = ref(null);
        const clienteEncontrado = ref(false);
        const cliente = ref('');
        const fechaReserva = ref(null);
        const numHabitaciones = ref(0);
        const showInputNumbers = ref(false);
        const personasPorHabitacion = ref(Array(10).fill(1));
        const habitacionesSeleccionadas = ref([]);
        const habitacionActiva = ref({});
        const mostrarDialog = ref(false);

        const buscarCliente = () => {
            // Implementa la lógica para buscar un cliente
            if (telefono.value === '1') {
                clienteEncontrado.value = true;
                // Aquí debes establecer los datos del cliente encontrado
            } else {
                clienteEncontrado.value = false;
                alert('Número de teléfono no encontrado');
            }
        };

        const conteoHabitaciones = computed(() => {
            const conteo = { Simples: 0, Duo: 0, Dobles: 0 };
            habitacionesSeleccionadas.value.forEach((tipo) => {
                if (tipo === 'Simple') {
                    conteo.Simples++;
                } else if (tipo === 'Duo') {
                    conteo.Duo++;
                } else if (tipo === 'Doble') {
                    conteo.Dobles++;
                }
            });
            return conteo;
        });

        const setHabitaciones = (newVal) => {
            if (newVal !== numHabitaciones.value) {
                for (let i = 0; i < personasPorHabitacion.value.length; i++) {
                    personasPorHabitacion.value[i] = 1; 
                }
                habitacionesSeleccionadas.value = [];
                habitacionActiva.value = {}; // Reiniciar las habitaciones activas
            }
            showInputNumbers.value = true;
        };

        const revisarReserva = () => {
            mostrarDialog.value = true; // Mostrar el dialogo de habitaciones
        };

        const validarReserva = () => {
            if (!numHabitaciones.value || !personasPorHabitacion.value.some((val) => val !== null)) {
                return false;
            }
            return personasPorHabitacion.value.slice(0, numHabitaciones.value).reduce((acc, curr) => acc + curr, 0) <= 40;
        };

        const agregarHabitacion = (numero, tipo) => {
            habitacionesSeleccionadas.value[numero - 1] = tipo;
            habitacionActiva.value[numero] = tipo; 
        };

        return {
            telefono,
            nombre,
            appat,
            apmat,
            correo,
            direccion,
            telefonon,
            clienteEncontrado,
            cliente,
            fechaReserva,
            numHabitaciones,
            showInputNumbers,
            personasPorHabitacion,
            habitacionesSeleccionadas,
            habitacionActiva,
            mostrarDialog,
            agregarHabitacion,
            buscarCliente,
            setHabitaciones,
            revisarReserva,
            validarReserva,
            conteoHabitaciones
        };
    }
};
</script>


<style scoped>
.card-room {
    width: 200;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.card-room img {
    width: 160px;
    height: 100px;
    border-radius: 10px;
    top: 0;
    left: 0;
}

.card-room-selected {
    display: flex;
    align-items: center;
    justify-content: start;
}

.card-room-selected img {
    width: 20%;
    height: 15%;
    border-radius: 4px;
    margin-right: 1em;
}

.habitacion-info h5 {
    margin: 0;
}
</style>