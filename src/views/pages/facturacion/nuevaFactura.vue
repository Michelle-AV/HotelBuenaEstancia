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

        const factura = ref([]);

        async function llenarTabla() {
            const response = await axios.get(`${DIRECC_IP}/hotelbe/factura`);
            factura.value = response.data;
            console.log("fact", factura.value);
        };

        onMounted(() => {
            llenarTabla();
        });

        return {
            factura
        };
    }
};
</script>



<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h3>Historial de Facturas</h3>
                <DataTable :value="factura" paginator :rows="5" tableStyle="min-width: 50rem"
                                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                    currentPageReportTemplate="{first} al {last} de {totalRecords}">
                                <template #paginatorstart>
                                    <Button type="button" icon="pi pi-refresh" text @click="llenarTabla()"/>
                                </template>
                                <Column field="id" header="ID Factura" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.idFactura }}
                                    </template>
                                </Column>
                                <Column field="montoF" header="Monto Total" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.montoFactura }}
                                    </template>
                                </Column>
                                <Column field="fecha" header="Fecha de Factura" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.fechaFactura }}
                                    </template>
                                </Column>
                                <Column field="idE" header="ID Estancia" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.estancia.idEstancia }}
                                    </template>
                                </Column>
                                <Column field="nombre" header="Nombre del Cliente" style="width: 20%">
                                    <template #body="slotProps">
                                        {{ slotProps.data.estancia.cliente.nombreCliente + " " + slotProps.data.estancia.cliente.ap_pat + " " + slotProps.data.estancia.cliente.ap_mat }}
                                    </template>
                                </Column>
                                <!-- <Column field="admin" header="" style="width: 25%">
                                    <template #body="slotProps">
                                        <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" @click="confirm2(slotProps.data)"/>
                                    </template>
                                </Column> -->
                            </DataTable>
            </div>
        </div>
    </div>
</template>
