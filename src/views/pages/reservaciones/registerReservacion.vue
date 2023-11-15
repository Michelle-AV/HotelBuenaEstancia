<script>
import { ref, computed } from 'vue';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import axios from 'axios';

import { DIRECC_IP } from '@/service/direccionIP.js'

import { useToast } from 'primevue/usetoast';

export default {
    components: {
        InputText,
        Button,
        Calendar,
        InputNumber,
        Dialog
    },
    setup() {
        const toast = useToast();

        const telefono = ref('');
        const nombre = ref('');
        const appat = ref('');
        const apmat = ref('');
        const correo = ref('');
        const direccion = ref('');
        const rfc = ref('');
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
            if (telefono.value.trim() != '') {
                axios.get(`${DIRECC_IP}/hotelbe/cliente/${telefono.value}`, 
                ).then(response => {
                    if(Object.keys(response.data).length > 0){
                        toast.add({ severity: 'success', summary: 'Si existe', detail: 'El cliente si existe.', life: 4000 });
                        telefono.value = '';
                        nombre.value = response.data[0].nombreCliente;
                        appat.value = response.data[0].ap_pat;
                        apmat.value = response.data[0].ap_mat;
                        correo.value = response.data[0].correo;
                        telefonon.value = response.data[0].celular;
                        rfc.value = response.data[0].rfc;
                        direccion.value = response.data[0].direccion;
                        clienteEncontrado.value = true;
                    } else {
                        toast.add({ severity: 'error', summary: 'Error: ', detail: 'No existe un cliente con ese número', life: 4000 });
                        nombre.value = '';
                        appat.value = '';
                        apmat.value = '';
                        correo.value = '';
                        telefonon.value = null;
                        rfc.value = '';
                        direccion.value = '';
                        clienteEncontrado.value = false;
                    }
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Incompleto:', detail: 'No hay un número de teléfono escrito.', life: 4000 });
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
                    personasPorHabitacion.value[i] = 0; 
                }
                habitacionesSeleccionadas.value = [];
                habitacionActiva.value = {}; // Reiniciar las habitaciones activas
            }
            showInputNumbers.value = true;
        };

        const fechaIni = ref('');
        const fechaFin = ref('');
        
        async function getFechas(fechaI, fechaF) {
            fechaIni.value = fechaI;
            fechaFin.value = fechaF;
        };

        let disponibilidadTotal = false;
        let disponibilidadTotalSimple = false;
        let disponibilidadTotalDuo = false;
        let disponibilidadTotalDoble = false;

        const revisarReserva = () => {
            if(fechaReserva.value === null) {
                toast.add({ severity: 'warn', summary: 'Sin fecha', detail: 'Seleccione un rango válido.', life: 4000 });
            }
            const personasA = personasPorHabitacion.value.filter(valor => valor > 0);
            const habitacionesNoVacias = habitacionesSeleccionadas.value.filter(habitacion => habitacion !== "");
            const partesFechaI = fechaReserva.value[0].toLocaleDateString().split('/');
            const fechaParseadaI = new Date(`${partesFechaI[2]}/${partesFechaI[1]}/${partesFechaI[0]}`);
            const nuevaFechaI = new Date(fechaParseadaI);

            const añoI = nuevaFechaI.getFullYear();
            const mesI = nuevaFechaI.getMonth() + 1;
            const díaI = nuevaFechaI.getDate();

            const fechaFormateadaI = `${añoI}-${mesI.toString().padStart(2, '0')}-${díaI.toString().padStart(2, '0')}`;

            const partesFechaF = fechaReserva.value[1].toLocaleDateString().split('/');
            const fechaParseadaF = new Date(`${partesFechaF[2]}/${partesFechaF[1]}/${partesFechaF[0]}`);
            const nuevaFechaF = new Date(fechaParseadaF);

            const añoF = nuevaFechaF.getFullYear();
            const mesF = nuevaFechaF.getMonth() + 1;
            const díaF = nuevaFechaF.getDate();
            const habitacionesPorTipo = {
                Simple: [],
                Duo: [],
                Doble: []
            };

            const fechaFormateadaF = `${añoF}-${mesF.toString().padStart(2, '0')}-${díaF.toString().padStart(2, '0')}`;
            getFechas(fechaFormateadaI, fechaFormateadaF);

            const fechaActual = new Date();

            const fechaFormateadaIDate = new Date(fechaFormateadaI);

            // if (fechaFormateadaIDate >= fechaActual) {
                if(habitacionesNoVacias.length > 0 && personasA.length > 0){
                habitacionesNoVacias.forEach(habitacion => {
                    let tipoHabitacion;
                    if (habitacion.includes("Simple")) {
                        tipoHabitacion = "Simple";
                    } else if (habitacion.includes("Duo")) {
                        tipoHabitacion = "Duo";
                    } else if (habitacion.includes("Doble")) {
                        tipoHabitacion = "Doble";
                    } else {
                        tipoHabitacion = "Desconocido";
                    }
                    habitacionesPorTipo[tipoHabitacion].push(habitacion);
                });

                const peticiones = [];

                if (habitacionesPorTipo.Simple.length > 0) {
                    peticiones.push(
                        axios.get(`${DIRECC_IP}/hotelbe/tipohab/Simple`).then(response => {
                            return axios.get(`${DIRECC_IP}/hotelbe/reservas/disponibilidad/${response.data[0].idTHabitacion}/${fechaFormateadaF}/${fechaFormateadaI}`);
                        }).then(response => {
                            return response.data >= habitacionesPorTipo.Simple.length;
                        })
                    );
                }

                if (habitacionesPorTipo.Duo.length > 0) {
                    peticiones.push(
                        axios.get(`${DIRECC_IP}/hotelbe/tipohab/Duo`).then(response => {
                            return axios.get(`${DIRECC_IP}/hotelbe/reservas/disponibilidad/${response.data[0].idTHabitacion}/${fechaFormateadaF}/${fechaFormateadaI}`);
                        }).then(response => {
                            return response.data >= habitacionesPorTipo.Duo.length;
                        })
                    );
                }

                if (habitacionesPorTipo.Doble.length > 0) {
                    peticiones.push(
                        axios.get(`${DIRECC_IP}/hotelbe/tipohab/Doble`).then(response => {
                            return axios.get(`${DIRECC_IP}/hotelbe/reservas/disponibilidad/${response.data[0].idTHabitacion}/${fechaFormateadaF}/${fechaFormateadaI}`);
                        }).then(response => {
                            return response.data >= habitacionesPorTipo.Doble.length;
                        })
                    );
                }

                Promise.all(peticiones).then(resultados => {
                    if (resultados.every(resultado => resultado)) {
                        toast.add({ severity: 'success', summary: 'Disponible.', detail: 'Si hay disponibilidad para reservar las habitaciones.', life: 4000 });
                        disponibilidadTotal = true;
                        mostrarDialog.value = true;
                    } else {
                        toast.add({ severity: 'error', summary: 'No disponible.', detail: 'No hay disponibilidad para reservar las habitaciones solicitadas.', life: 4000 });
                    }
                });
                } else {
                    toast.add({ severity: 'error', summary: 'Error: ', detail: 'No has agregado alguna habitación.', life: 4000 });
            };
            // } else {
            //     toast.add({ severity: 'warn', summary: 'Invalido.', detail: 'Selecciona una fecha posterior o igual al día de hoy.', life: 4000 });
            // }
        };

        const validarReserva = () => {
            if (!numHabitaciones.value || !personasPorHabitacion.value.some((val) => val !== null)) {
                return false;
            }
            return personasPorHabitacion.value.slice(0, numHabitaciones.value).reduce((acc, curr) => acc + curr, 0) <= 40;
        };

        const agregarHabitacion = (numero, tipo) => {
            if(personasPorHabitacion.value[numero-1] > 0){
                habitacionesSeleccionadas.value[numero - 1] = tipo;
                habitacionActiva.value[numero] = tipo; 
            } else {
                toast.add({ severity: 'error', summary: 'Error: ', detail: 'No se puede agregar una habitación con 0 personas.', life: 4000 });
            }
        };

        async function generarReserva(){
            const habitacionesNoVacias = habitacionesSeleccionadas.value.filter(habitacion => habitacion !== "");
            axios.post(`${DIRECC_IP}/hotelbe/reservas/newReserva`, {
                "fechaLlegada": fechaIni.value,
                "nombreCliente": nombre.value,
                "apPaterno": appat.value,
                "apMaterno": apmat.value,
                "telefonoCli": telefonon.value,
                "rfcCli": rfc.value,
                "email": correo.value,
                "direccion": direccion.value
            }).then(response => {
                habitacionesNoVacias.forEach(habitacion => {
                console.log(habitacion);
                axios.post(`${DIRECC_IP}/hotelbe/reservasHab/newReservaHab`, {
                    "fechaLlegada": fechaIni.value,
                    "fechaSalida": fechaFin.value,
                    "tipoHab": habitacion
                }).then(response => {
                    toast.add({ severity: 'success', summary: 'Reserva exitosa', detail: 'Se registraron los datos correctamente.', life: 4000 });
                }).catch(error => {
                    if(error.response.status === 500) {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Seleccione una fecha válida', life: 4000 });
                    } else {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                    }
                });
            });

            }).catch(error => {
                toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
            });
        }

        return {
            generarReserva,
            fechaIni,
            telefono,
            nombre,
            appat,
            apmat,
            correo,
            rfc,
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
            conteoHabitaciones,
            getFechas
        };
    }
};
</script>

<template>
    <div class="p-grid p-fluid">
        <Toast />
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
                        <InputText id="nombre" v-model="nombre" :disabled="clienteEncontrado === true" />
                    </div>
                    <div class="flex flex-column gap-2 col-4">
                        <label for="appat">Apellido paterno</label>
                        <InputText id="appat" v-model="appat" :disabled="clienteEncontrado === true"/>
                    </div>
                    <div class="flex flex-column gap-2 col-4">
                        <label for="apmat">Apellido materno</label>
                        <InputText id="apmat" v-model="apmat" :disabled="clienteEncontrado === true"/>
                    </div>
                </div>

                <div class="p-fluid formgrid grid mt-1">
                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="correo">Correo electrónico</label>
                        <InputText id="correo" v-model="correo" :disabled="clienteEncontrado === true"/>
                    </div>
                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="telefonon">Teléfono</label>
                        <InputNumber id="telefonon" v-model="telefonon" :disabled="clienteEncontrado === true"/>
                    </div>

                    <div class="flex flex-column gap-2 col-6 mt-3">
                        <label for="rfc">RFC</label>
                        <InputText id="rfc" v-model="rfc" :disabled="clienteEncontrado === true"/>
                    </div>

                    
                </div>

                <div class="flex flex-column gap-2 mt-3">
                    <label for="direccion">Dirección</label>
                        <InputText id="direccion" v-model="direccion" :disabled="clienteEncontrado === true"/>
                </div>

                    <div class="flex flex-column form grid grid gap-2 col-6 mt-1">
                        <label for="fechaReserva">Fecha de Reserva</label>
                        <Calendar id="fechaReserva" v-model="fechaReserva" selectionMode="range" :manual-input="false" showIcon placeholder="Seleccione un rango de fechas" dateFormat="yy/mm/dd"/>
                    </div>
                    
                

                <div class="flex flex-column gap-2 formgrid grid col-3">
                    <label for="numHabitaciones">Número de Habitaciones</label>
                    <InputNumber v-model="numHabitaciones" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="3" @input="setHabitaciones" />
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
                            :min="0"
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

        <Dialog v-model:visible="mostrarDialog" modal header="Confirmar reservación" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="p-fluid formgrid grid mt-5">
                <div class="flex flex-column gap-2 col-4">
                    <label for="nombre">Nombre(s)</label>
                    <InputText id="nombre" v-model="nombre" :disabled="clienteEncontrado === true" />
                </div>
                <div class="flex flex-column gap-2 col-4">
                    <label for="appat">Apellido paterno</label>
                    <InputText id="appat" v-model="appat" :disabled="clienteEncontrado === true"/>
                </div>
                <div class="flex flex-column gap-2 col-4">
                    <label for="apmat">Apellido materno</label>
                    <InputText id="apmat" v-model="apmat" :disabled="clienteEncontrado === true"/>
                </div>
            </div>
            <div class="p-fluid formgrid grid mt-3">
                <div class="flex flex-column gap-2 col-6">
                    <label for="correo">Correo electrónico</label>
                    <InputText id="correo" v-model="correo" :disabled="clienteEncontrado === true"/>
                </div>
                <div class="flex flex-column gap-2 col-6">
                    <label for="telefonon">Teléfono</label>
                    <InputNumber id="telefonon" inputId="withoutgrouping" v-model="telefonon" :disabled="clienteEncontrado === true"/>
                </div>
            </div>
            <div class="p-fluid formgrid grid mt-3">
                <div class="flex flex-column gap-2 col-12">
                    <label for="fechaIni">Fecha de llegada</label>
                    <Calendar id="fechaIni" v-model="fechaIni" :manual-input="false" showIcon placeholder="Seleccione la fecha de inicio" dateFormat="yy/mm/dd" disabled/>
                </div>
            </div>
            <div class="text-right">
                <Button label="Reservar" class="mt-4" icon="pi pi-book" @click="generarReserva()"/>
            </div>
        </Dialog>

    </div>
</template>

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