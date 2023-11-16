<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import { DIRECC_IP } from '@/service/direccionIP.js';
import Tag from 'primevue/tag';

import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeMount} from 'vue';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const habitaciones = ref([]);

        const telefono = ref('');
        const nombre = ref('');
        const appat = ref('');
        const apmat = ref('');
        const correo = ref('');
        const direccion = ref('');
        const rfc = ref('');
        const telefonon = ref(null);
        const clienteEncontrado = ref(false);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/estancia`);
            habitaciones.value = response.data;
            console.log("estancias: ", habitaciones.value);
        }

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

        const serviciosR = ref();
        const tipoSE = ref([]);

        async function fetchServicios() {
            try {
                const response = await axios.get(`${DIRECC_IP}/hotelbe/servicio`);
                tipoSE.value = response.data.map(item => ({ name: item.descServicio }));
            } catch (error) {
                console.error('Error al obtener los servicios', error);
            }
        }

        const fechaActual = new Date();

        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const día = fechaActual.getDate().toString().padStart(2, '0');

        const fechaFormateada = `${año}-${mes}-${día}`;

        const horas = fechaActual.getHours().toString().padStart(2, '0');
        const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
        const segundos = fechaActual.getSeconds().toString().padStart(2, '0');

        const horaFormateada = `${horas}:${minutos}:${segundos}`;

        async function registrarEstancia() {
            if (nombre.value.trim() != '' && appat.value.trim() != '' && apmat.value.trim() != '' && correo.value.trim() != '' && direccion.value.trim() != '' && rfc.value.trim() != '' && telefonon.value.trim() != '' && serviciosR.value != null) {
                const idCliente = await axios.get(`${DIRECC_IP}/hotelbe/cliente/${telefonon.value}`);
                axios.post(`${DIRECC_IP}/hotelbe/estancia/newEstancia`, {
                    "fechaLlegadaEstancia": fechaFormateada,
                    "horaLlegadaEstancia": horaFormateada,
                    "cliente": {
                        "idCliente": idCliente.data[0].idCliente
                    }
                }).then(response => {
                    axios.get(`${DIRECC_IP}/hotelbe/estancia/lastID`
                    ).then(response =>{
                        axios.post(`${DIRECC_IP}/hotelbe/servcons/${response.data[0].idEstancia}/${serviciosR.value.name}`
                        ).then(response => {
                            toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registro la estancia correctamente.', life: 4000 });  
                        }).catch(error => {
                            toast.add({ severity: 'error', summary: 'Error: No se pudo registrar', detail: 'Verifique los datos: '+ error, life: 4000 });
                        });
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo registrar', detail: 'Verifique los datos: '+ error, life: 4000 });
                    });
                }).catch(error => {
                    toast.add({ severity: 'error', summary: 'Error: No se pudo registrar', detail: 'Verifique los datos: '+ error, life: 4000 });
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Revisar', detail: 'Verifica que todos los campos esten completos', life: 3000 });
            }
        }

        async function confirm2(row){
            confirm.require({
                message: `¿Estas seguro de que quieres finalizar la Estancia ${row.idEstancia}?`,
                header: 'Facturación',
                icon: 'pi pi-bookmark',
                rejectClass: 'p-button-info p-button-text',
                acceptClass: 'p-button-success p-button-text',
                acceptLabel: "Facturar",
                rejectLabel: "Cancelar",
                accept: () => {
                    axios.post(`${DIRECC_IP}/hotelbe/factura/finEstancia/${row.idEstancia}`,
                    ).then(response => {
                        toast.add({ severity: 'success', summary: 'Facturación exitosa', detail: 'Se finalizó la estancia correctamente.', life: 3000 });
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo borrar', detail: 'Ocurrió un error: '+ error, life: 3000 });
                    });
                },
                reject: () => {
                    toast.add({ severity: 'warn', summary: 'No se facturó', detail: 'Seleccionaste cancelar', life: 2000 });
                }
            });
        }

        onMounted(() => {
            llenarTabla();
            fetchServicios();
        });

        onBeforeMount(() => {
        });

        return {
            buscarCliente,
            confirm2,
            registrarEstancia,
            telefono,
            nombre,
            appat,
            apmat,
            correo,
            rfc,
            direccion,
            telefonon,
            clienteEncontrado,
            serviciosR,
            tipoSE,
            habitaciones
        };
    }
};
</script>




<template>
    <div class="grid">
        <Toast />
        <ConfirmDialog>
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button label="Eliminar" @click="acceptCallback"></Button>
                        <Button label="Cancelar" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <div class="col-12">
            <div class="card">
                <h5>Estancias</h5>
                <TabView>
                    <TabPanel header="Lista de estancias">
                        <p class="m-0">
                            <DataTable :value="habitaciones" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} al {last} de {totalRecords}">
                                <template #paginatorstart>
                                    <Button type="button" icon="pi pi-refresh" text @click="refresh()"/>
                                </template>
                                <Column field="idEstancia" header="ID Estancia" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.idEstancia }}
                                    </template>
                                </Column>
                                <Column field="fechaLl" header="Fecha Llegada" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.fechaLlegadaEstancia }}
                                    </template>
                                </Column>
                                <Column field="horaLl" header="Hora Llegada" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.horaLlegadaEstancia }}
                                    </template>
                                </Column>
                                <Column field="nombreP" header="Nombre Cliente" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.cliente.nombreCliente + " " + slotProps.data.cliente.ap_pat + " " + slotProps.data.cliente.ap_mat }}
                                    </template>
                                </Column>
                                <Column field="reserv" header="ID Reservación" style="width: 20%">
                                    <template #body="slotProps">
                                        <template v-if="slotProps.data.reservacion != null">
                                            {{ slotProps.data.reservacion.idReservacion }}
                                        </template>
                                    </template>
                                </Column>
                                <Column field="status" header="Estado" style="width: 15%">
                                    <template #body="slotProps">
                                        <template v-if="slotProps.data.horaSalidaEstacia === null" >
                                            <Tag class="ml-0" value="ACTIVA" severity="success"/>
                                        </template>
                                        <template v-else-if="slotProps.data.horaSalidaEstacia != null">
                                            <Tag class="ml-0" value="FINALIZADA" severity="text"></Tag>
                                        </template>
                                    </template>
                                </Column>
                                <Column field="admin" header="Facturar" style="width: 15%">
                                    <template #body="slotProps">
                                        <template v-if="slotProps.data.horaSalidaEstacia === null" >
                                            <Button icon="pi pi-book" severity="text" text rounded aria-label="Cancel" @click="confirm2(slotProps.data)"/>
                                        </template>
                                        <template v-else-if="slotProps.data.horaSalidaEstacia != null">
                                        </template>
                                    </template>
                                </Column>
                            </DataTable>
                        </p>
                    </TabPanel>
                    <TabPanel header="Crear una nueva estancia">
                        <p class="m-0 mt-3">
                            <div class="card">
                                <h6>Buscar un cliente existente</h6>
                                <div class="flex justify-center items-center mt-2">
                                    <InputText v-model="telefono" placeholder="Ingrese el número de teléfono" class="mr-2 col-5" />
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

                            <h6>Selecciona el nombre del servicio:</h6>
                            <Dropdown v-model="serviciosR" :options="tipoSE" optionLabel="name" placeholder="Elige un servicio" class="w-full md:w-14rem"/>
                        </p>
                        <div class="text-right">
                            <Button class="mt-4" label="Registrar" icon="pi pi-save" @click="registrarEstancia()"/>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
