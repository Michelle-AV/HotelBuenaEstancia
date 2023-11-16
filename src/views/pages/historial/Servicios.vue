<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import { DIRECC_IP } from '@/service/direccionIP.js'

import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeMount} from 'vue';
import { useConfirm } from "primevue/useconfirm";

export default {
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const nomService = ref('');
        const precioS = ref(null);

        async function registrarServicio() {
            if (nomService.value.trim() !== '' && precioS.value > 0) {
                axios.post(`${DIRECC_IP}/hotelbe/servicio`, {
                    "descServicio": nomService.value,
                    "precioServicio": precioS.value
                }).then(response => {
                    toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registraron el servicio correctamente.', life: 4000 });
                    nomService.value == '';
                    precioS.value == null;
                    llenarTabla();
                }).catch(error => {
                    toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Revisar', detail: 'Verifica que todos los campos esten completos', life: 3000 });
            }
        };

        const serviciosR = ref();
        const tipoSE = ref([]);

        const servicios = ref([]);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/servicio`);
            servicios.value = response.data;
            console.log("Servicios: ", servicios.value);
        }

        async function refresh() {
            llenarTabla();
        }

        async function confirm2(row){
            confirm.require({
                message: `¿Estas seguro de que quieres eliminar el ${row.descServicio}?`,
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                rejectClass: 'p-button-info p-button-text',
                acceptClass: 'p-button-danger p-button-text',
                acceptLabel: "Eliminar",
                rejectLabel: "Cancelar",
                accept: () => {
                    axios.delete(`${DIRECC_IP}/hotelbe/servicio/${row.idServicio}`,
                    ).then(response => {
                        toast.add({ severity: 'success', summary: 'Eliminación exitosa', detail: 'Se eliminó el servicio correctamente.', life: 3000 });
                        llenarTabla();
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo borrar', detail: 'Ocurrió un error: '+ error, life: 3000 });
                    });
                },
                reject: () => {
                    toast.add({ severity: 'warn', summary: 'No se borró', detail: 'Seleccionaste cancelar', life: 2000 });
                }
            });
        }

        async function fetchServicios() {
            try {
                const response = await axios.get(`${DIRECC_IP}/hotelbe/servicio`);
                tipoSE.value = response.data.map(item => ({ name: item.descServicio }));
                console.log(tipoSE.value);
            } catch (error) {
                console.error('Error al obtener tipos de habitación', error);
            }
        }

        onMounted(() => {
            llenarTabla();
        });

        onBeforeMount(() => {
            fetchServicios();
        });

        return {
            serviciosR,
            tipoSE,
            confirm2,
            nomService,
            refresh,
            precioS,
            servicios,
            llenarTabla,
            registrarServicio
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
                <h3>Servicios</h3>
                <TabView>
                    <TabPanel header="Servicios consumidos">
                        <p class="m-0">
                            <h6>Selecciona el nombre del servicio:</h6>
                            <Dropdown v-model="serviciosR" :options="tipoSE" optionLabel="name" placeholder="Elige un servicio" class="w-full md:w-14rem"/>
                        </p>
                    </TabPanel>
                    <TabPanel header="Añadir un nuevo servicio">
                        <p class="m-0 mt-3">
                            <h6>Ingresa el nombre que tendrá este servicio:</h6>
                            <span class="mt-5 p-float-label">
                                <InputText id="nomService" v-model="nomService" />
                                <label for="nomService">Nombre del servicio</label>
                            </span>

                            <div class="mt-5 flex-auto">
                                <label for="stacked-buttons" class="font-bold block mb-2"> Precio del servicio </label>
                                <InputNumber v-model="precioS" inputId="stacked-buttons" showButtons mode="currency" currency="MXN" />
                            </div>
                        </p>
                        <div class="text-right">
                            <Button label="Registrar" icon="pi pi-save" @click="registrarServicio()"/>
                        </div>
                        <div class="mt-4 card">
                            <h5>Servicios registrados</h5>
                            <DataTable :value="servicios" paginator :rows="5" tableStyle="min-width: 50rem"
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} al {last} de {totalRecords}">
                                <template #paginatorstart>
                                    <Button type="button" icon="pi pi-refresh" text @click="refresh()"/>
                                </template>
                                <Column field="id" header="ID" style="width: 25%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.idServicio }}
                                    </template>
                                </Column>
                                <Column field="descServicio" header="Nombre" style="width: 25%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.descServicio }}
                                    </template>
                                </Column>
                                <Column field="precioServicio" header="Precio" style="width: 25%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.precioServicio }}
                                    </template>
                                </Column>
                                <Column field="admin" header="" style="width: 25%">
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
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
