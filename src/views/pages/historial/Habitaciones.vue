<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { DIRECC_IP } from '@/service/direccionIP.js'

import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeMount} from 'vue';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const modalEdit = ref(false);
        const modalDelete = ref(false);

        const nomTipo = ref('');
        const cantCamas = ref(null);
        const numPersonas = ref(null);
        const precioTH = ref(null);

        async function registrarTH() {
            if (nomTipo.value.trim() !== '' && cantCamas.value !== null && numPersonas.value !== null && precioTH.value > 0) {
                axios.post(`${DIRECC_IP}/hotelbe/tipohab`, {
                    "descripcionHab": nomTipo.value,
                    "cantCamas": cantCamas.value,
                    "cantPersonas": numPersonas.value,
                    "precioHabitacion": precioTH.value
                }).then(response => {
                    toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registraron los datos correctamente.', life: 4000 });
                    nomTipo.value == '';
                    cantCamas.value == null;
                    numPersonas.value == null;
                    precioTH.value == null;
                }).catch(error => {
                    toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Revisar', detail: 'Verifica que todos los campos esten completos', life: 3000 });
            }
        };

        const numHabitación = ref(null);

        const thselect = ref();
        const tiposH = ref([]);

        // const fetchTiposHabitacion = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:8080/hotelbe/tipohab');
        //         tiposH.value = response.data.map(item => ({ name: item.descripcionHab }));
        //     } catch (error) {
        //         console.error('Error al obtener tipos de habitación', error);
        //     }
        // };

        async function fetchTiposHabitacion() {
            try {
                const response = await axios.get(`${DIRECC_IP}/hotelbe/tipohab`);
                tiposH.value = response.data.map(item => ({ name: item.descripcionHab }));
            } catch (error) {
                console.error('Error al obtener tipos de habitación', error);
            }
        }

        const tipoHab = ref([]);

        async function registrarHab() {
            if (numHabitación.value != null && thselect.value) {
                const response = await axios.get(`${DIRECC_IP}/hotelbe/tipohab/${thselect.value.name}`);
                tipoHab.value = response.data[0].idTHabitacion;
                axios.post(`${DIRECC_IP}/hotelbe/habitacion`, {
                    "numeroHabitacion": numHabitación.value,
                    "tipoHab": {
                        "idTHabitacion": tipoHab.value
                    }
                }).then(response => {
                    toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registraron los datos correctamente.', life: 4000 });

                }).catch(error => {
                    toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Revisar', detail: 'Verifica que todos los campos esten completos', life: 3000 });
            }
        };

        const habitaciones = ref([]);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/habitacion`);
            habitaciones.value = response.data;
        }

        const numHabitaciónE = ref(null);
        const tiposHE = ref([]);
        const thselectE = ref();

        async function editHab(row) {
            this.modalEdit = true;
            numHabitaciónE.value = row.numeroHabitacion;
            const response = await axios.get(`${DIRECC_IP}/hotelbe/tipohab`);
            tiposHE.value = response.data.map(item => ({ name: item.descripcionHab }));
        }

        async function refresh() {
            location.reload();
        }

        async function confirm2(row){
            confirm.require({
                message: `¿Estas seguro de que quieres eliminar la Habitación ${row.numeroHabitacion}?`,
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                rejectClass: 'p-button-info p-button-text',
                acceptClass: 'p-button-danger p-button-text',
                acceptLabel: "Eliminar",
                rejectLabel: "Cancelar",
                accept: () => {
                    axios.delete(`${DIRECC_IP}/hotelbe/habitacion/${row.idHabitacion}`,
                    ).then(response => {
                    toast.add({ severity: 'success', summary: 'Eliminación exitosa', detail: 'Se eliminó la habitación correctamente.', life: 3000 });
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo borrar', detail: 'Ocurrió un error: '+ error, life: 3000 });
                    });
                },
                reject: () => {
                    toast.add({ severity: 'warn', summary: 'No se borró', detail: 'Seleccionaste cancelar', life: 2000 });
                }
            });
        }

        // async function editH2(row){
        //     // const response = await axios.get(`http://localhost:8080/hotelbe/tipohab/${thselect.value.name}`);
        //     // tipoHab.value = response.data[0].idTHabitacion;
        //     // axios.post(`http://localhost:8080/hotelbe/habitacion`, {
        //     //     "numeroHabitacion": numHabitación.value,
        //     //     "tipoHab": {
        //     //         "idTHabitacion": tipoHab.value
        //     //     }
        //     // }).then(response => {
        //     //     toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registraron los datos correctamente.', life: 4000 });

        //     // }).catch(error => {
        //     //     toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
        //     // });
        //     console.log("ID: ", row.idHabitacion);
        // }

        onMounted(() => {
            llenarTabla();
        });

        onBeforeMount(() => {
            fetchTiposHabitacion();
        });

        return {
            numHabitaciónE,
            modalDelete,
            modalEdit,
            habitaciones,
            tiposH,
            tiposHE,
            thselect,
            confirm2,
            thselectE,
            nomTipo,
            cantCamas,
            numHabitación,
            numPersonas,
            precioTH,
            registrarTH,
            registrarHab,
            editHab,
            refresh
        };
    }
};
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
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
                <h3>Habitaciones</h3>
                <TabView>
                    <TabPanel header="Historial de habitaciones">
                        <p class="m-0">
                            <DataTable :value="habitaciones" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} al {last} de {totalRecords}">
                                <template #paginatorstart>
                                    <Button type="button" icon="pi pi-refresh" text @click="refresh()"/>
                                </template>
                                <Column field="numHab" header="Num. Habitación" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.numeroHabitacion }}
                                    </template>
                                </Column>
                                <Column field="tipoH" header="Tipo" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.tipoHab.descripcionHab }}
                                    </template>
                                </Column>
                                <Column field="numCamas" header="Num. Camas" style="width: 15%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.tipoHab.cantCamas }}
                                    </template>
                                </Column>
                                <Column field="numPersonas" header="Num. Personas" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.tipoHab.cantPersonas }}
                                    </template>
                                </Column>
                                <Column field="precioHab" header="Precio" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.tipoHab.precioHabitacion }}
                                    </template>
                                </Column>
                                <Column field="admin" header="" style="width: 15%">
                                    <template #body="slotProps">
                                        <!-- <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editHab(slotProps.data)"/>
                                        <Dialog v-model:visible="modalEdit" modal header="Editar habitación" :style="{ width: '40rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                            <p>
                                                <span class="mt-4 p-float-label">
                                                    <InputNumber id="numHabitaciónE" v-model="numHabitaciónE" />
                                                    <label for="numHabitaciónE">Número de habitación</label>
                                                </span>   
                                                <h6>Tipo de habitación:</h6>
                                                <Dropdown v-model="thselectE" :options="tiposHE" optionLabel="name" placeholder="Tipo de habitación" class="w-full md:w-14rem" />
                                            </p>
                                            <div class="text-right">
                                                <Button label="Actualizar" icon="pi pi-check" severity="success" @click="editH2(slotProps.data)" autofocus />
                                            </div>
                                        </Dialog> -->

                                        <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" @click="confirm2(slotProps.data)"/>
                                    </template>
                                </Column>
                            </DataTable>
                        </p>
                    </TabPanel>
                    <TabPanel header="Registrar un nuevo tipo de habitación">
                        <p class="m-0 mt-3">
                            <h6>Ingresa el nombre que tendrá este tipo de habitación:</h6>
                            <span class="mt-5 p-float-label">
                                <InputText id="nomTipo" v-model="nomTipo" />
                                <label for="nomTipo">Tipo de habitación</label>
                            </span>

                            <h6>¿Cuántas camas tendra este tipo de habitación?</h6>
                            <span class="mt-5 p-float-label">
                                <InputNumber id="cantCamas" v-model="cantCamas" />
                                <label for="cantCamas">Número de camas</label>
                            </span>

                            <h6>¿Cuántas personas entrarán en este tipo de habitación?</h6>
                            <span class="mt-5 p-float-label">
                                <InputNumber id="numPersonas" v-model="numPersonas" />
                                <label for="numPersonas">Número de personas</label>
                            </span>

                            <div class="mt-5 flex-auto">
                                <label for="stacked-buttons" class="font-bold block mb-2"> Precio de las habitaciones </label>
                                <InputNumber v-model="precioTH" inputId="stacked-buttons" showButtons mode="currency" currency="MXN" />
                            </div>

                        </p>
                        <div class="text-right">
                            <Button label="Registrar" icon="pi pi-save" @click="registrarTH()"/>
                        </div>
                    </TabPanel>
                    <TabPanel header="Registrar una nueva habitación">
                        <p class="m-0 mt-3">
                            <h6>Selecciona el tipo de habitación:</h6>
                            <Dropdown v-model="thselect" :options="tiposH" optionLabel="name" placeholder="Tipo de habitación" class="w-full md:w-14rem" @click="fetchTiposHabitacion()"/>

                            <h6>¿Qué número tendrá la habitación?</h6>
                            <span class="mt-5 p-float-label">
                                <InputNumber id="numHabitación" v-model="numHabitación" />
                                <label for="numHabitación">Número de habitación</label>
                            </span>
                        </p>
                        <div class="text-right">
                            <Button label="Registrar" icon="pi pi-save" @click="registrarHab()"/>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
