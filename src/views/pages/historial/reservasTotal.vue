<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Tag from 'primevue/tag';

import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeMount} from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { DIRECC_IP } from '@/service/direccionIP.js'

export default {
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const reservas = ref([]);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/reservas`);
            reservas.value = response.data;
            console.log("Reservas: ", reservas.value);
        };

        async function confirm2(row){
            confirm.require({
                message: `¿Estas seguro de que quieres actualizar el estado de la Reservación ${row.idReservacion}?`,
                header: 'Confirmación',
                icon: 'pi pi-refresh',
                rejectClass: 'p-button-danger p-button-text',
                acceptClass: 'p-button-text p-button-text',
                acceptLabel: "Actualizar",
                rejectLabel: "Cancelar",
                accept: () => {
                    axios.put(`${DIRECC_IP}/hotelbe/reservas/actEstado/${row.idReservacion}`,
                    ).then(response => {
                        toast.add({ severity: 'success', summary: 'Actualización exitosa', detail: 'Se actualizó el estado de la reservación correctamente.', life: 3000 });
                        llenarTabla();
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo borrar', detail: 'Ocurrió un error: '+ error, life: 3000 });
                    });
                },
                reject: () => {
                    toast.add({ severity: 'warn', summary: 'No se actualizó', detail: 'Seleccionaste cancelar', life: 2000 });
                }
            });
        }

        onMounted(() => {
            llenarTabla();
        });

        return {
            reservas,
            confirm2,
            llenarTabla
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
                <h5>Total de Reservas</h5>
                <DataTable class="mt-4" :value="reservas" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} al {last} de {totalRecords}">
                        <template #paginatorstart>
                            <Button type="button" icon="pi pi-refresh" text @click="llenarTabla()"/>
                        </template>
                        <Column field="ID" header="ID" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.idReservacion }}
                            </template>
                        </Column>
                        <Column field="nombre" header="Nombre Completo" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.cliente.nombreCliente + " " + slotProps.data.cliente.ap_pat + " " + slotProps.data.cliente.ap_mat }}
                            </template>
                        </Column>
                        <Column field="estado" header="Estado" style="width: 15%">
                            <template #body="slotProps">
                                <template v-if="slotProps.data.estado === 'PENDIENTE'" >
                                    <Tag class="ml-1" value="PENDIENTE" severity="warning"/>
                                </template>
                                <template v-else-if="slotProps.data.estado === 'ACTIVA'">
                                    <Tag class="ml-3" value="ACTIVA" severity="text"></Tag>
                                </template>
                            </template>
                        </Column>
                        <Column field="correo" header="Correo" style="width: 20%">
                            <template #body="slotProps">
                                {{ slotProps.data.cliente.correo }}
                            </template>
                        </Column>
                        <Column field="admin" header="Actualizar estado" style="width: 15%">
                            <template #body="slotProps">
                                <template v-if="slotProps.data.estado === 'PENDIENTE'">
                                    <Button icon="pi pi-wrench" class="ml-6" severity="text" text rounded aria-label="Cancel" @click="confirm2(slotProps.data)"/>
                                </template>
                            </template>
                        </Column>
                    </DataTable>
            </div>
        </div>
    </div>
</template>
