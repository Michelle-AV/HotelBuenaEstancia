<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted, onBeforeMount} from 'vue';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";
import { DIRECC_IP } from '@/service/direccionIP.js'


export default {
setup() {
    const toast = useToast();
    const confirm = useConfirm();

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        apPat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        apMat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        tel: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        rfc: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        direc: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    });

    // Datos estáticos
    const clientes = ref([]);

    async function llenarTabla() {
        const response = await axios.get(`${DIRECC_IP}/hotelbe/cliente`);
        clientes.value = response.data;
        console.log("Clientes: ", clientes.value);
    }

    onMounted(() => {
        llenarTabla();
    });

    onBeforeMount(() => {
    });

    return {
        clientes,
        filters
    };
}
};
</script>



<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Clientes registrados</h5>

                <div class="card">
                    <DataTable v-model:filters="filters" :value="clientes" paginator :rows="10" responsiveLayout="scroll" :globalFilterFields="['name', 'apPat', 'apMat', 'tel', 'rfc', 'email', 'direc']">
                        <template #paginatorstart>
                            <Button type="button" icon="pi pi-refresh" text @click="llenarTabla()"/>
                        </template>
                        <template #header>
                            <div class="flex justify-content-end">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Numero del Cliente" />
                                </span>
                            </div>
                        </template>
                        <Column field="name" header="Nombre"  style="width: 10%">
                            <template #body="slotProps">
                                {{ slotProps.data.nombreCliente }}
                            </template>
                        </Column>
                        <Column field="apPat" header="Apellido Paterno"  style="width: 10%">
                            <template #body="slotProps">
                                {{ slotProps.data.ap_pat }}
                            </template>
                        </Column>
                        <Column field="apMat" header="Apellido Materno"  style="width: 10%">
                            <template #body="slotProps">
                                {{ slotProps.data.ap_mat }}
                            </template>
                        </Column>
                        <Column field="tel" header="Telefono"  style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.celular }}
                            </template>
                        </Column>
                        <Column field="rfc" header="RFC"  style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.rfc }}
                            </template>
                        </Column>
                        <Column field="email" header="Email"  style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.correo }}
                            </template>
                        </Column>
                        <Column field="direc" header="Direccion"  style="width: 15%">
                            <template #body="slotProps">
                                {{ slotProps.data.direccion }}
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>
        </div>
    </div>
</template>
