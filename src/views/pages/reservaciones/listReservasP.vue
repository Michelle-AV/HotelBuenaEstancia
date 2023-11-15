<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import { useToast } from 'primevue/usetoast';
import { ref, onMounted, onBeforeMount} from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { DIRECC_IP } from '@/service/direccionIP.js'

export default {
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const reservasP = ref([]);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/reservas/pendientesAll`);
            reservasP.value = response.data;
            console.log("A: ", reservasP.value[0][1]);
            for (let i = 0; i < reservasP.value.length; i++) {
                // Verificar que hay suficientes elementos en cada reserva
                if (reservasP.value[i].length >= 5) {
                    tabla.id.push(reservasP.value[i][0]);
                    tabla.estado.push(reservasP.value[i][1]);
                    tabla.nombre.push(reservasP.value[i][2]);
                    tabla.appat.push(reservasP.value[i][3]);
                    tabla.apmat.push(reservasP.value[i][4]);

                    // Verificar si hay un sexto elemento en la reserva
                    if (reservasP.value[i].length >= 6) {
                        tabla.numHabs.push(reservasP.value[i][5]);
                    } else {
                        // Asignar un valor predeterminado si no hay sexto elemento
                        tabla.numHabs.push("Sin número de habitación");
                    }
                } else {
                    // Manejar el caso donde no hay suficientes elementos en la reserva
                    console.error(`La reserva en la posición ${i} no tiene suficientes elementos.`);
                }
            }
            console.log("Tabla:", tabla);
        };

        const tabla = {
            id: [],
            estado: [],
            nombre: [],
            appat: [],
            apmat: [],
            numHabs: []
        };

        onMounted(() => {
            llenarTabla();
        });

        return {
            tabla,
            llenarTabla
        };
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Reservas Pendientes</h5>
                <div class="card">
                    <DataTable :value="tabla">
                        <Column field="id" header="ID" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.id }}
                            </template>
                        </Column>
                        <!-- <Column field="estado" header="Estado" />
                        <Column field="nombre" header="Nombre" />
                        <Column field="appat" header="Apellido Paterno" />
                        <Column field="apmat" header="Apellido Materno" />
                        <Column field="numHabs" header="Número de Habitación" /> -->
                        <!-- Resto del código -->
                    </DataTable>
                    <!-- <DataTable :value="reservasP" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} al {last} de {totalRecords}" :key="JSON.stringify(reservasP)">
                        <template #paginatorstart>
                            <Button type="button" icon="pi pi-refresh" text @click="llenarTabla()"/>
                        </template>
                        <Column field="ID" header="ID" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data[0][0] }}
                            </template>
                        </Column>
                        <Column field="nombre" header="Nombre Completo" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data[0][1] }}
                            </template>
                        </Column>
                        <Column field="estado" header="Estado" style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data[0][1] }}
                            </template>
                        </Column>
                        <Column field="numHab" header="Num. Habitaciones" style="width: 20%">
                            <template #body="slotProps">
                                {{ slotProps.data[0][1] }}
                            </template>
                        </Column>
                        <Column field="admin" header="" style="width: 15%">
                            <template #body="slotProps">
                                <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" @click="confirm2(slotProps.data)"/>
                            </template>
                        </Column>
                    </DataTable> -->
                </div>
            </div>
        </div>
    </div>
</template>
