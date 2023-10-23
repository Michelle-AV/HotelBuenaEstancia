<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                 // optional
import { FilterMatchMode } from 'primevue/api';


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

</script>



<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Clientes registrados</h5>

                <div class="card">
                    <DataTable v-model:filters="filters" :value="clientes" paginator :rows="10" responsiveLayout="scroll" :globalFilterFields="['name', 'apPat', 'apMat', 'tel', 'rfc', 'email', 'direc']">

                        <template #header>
                            <div class="flex justify-content-end">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" placeholder="Numero del Cliente" />
                                </span>
                            </div>
                        </template>
                        <Column field="name" header="Nombre"  style="width: 15%"></Column>
                        <Column field="apPat" header="Apellido Paterno"  style="width: 15%"></Column>
                        <Column field="apMat" header="Apellido Materno"  style="width: 15%"></Column>
                        <Column field="tel" header="Telefono"  style="width: 15%"></Column>
                        <Column field="rfc" header="RFC"  style="width: 15%"></Column>
                        <Column field="email" header="Email"  style="width: 15%"></Column>
                        <Column field="direc" header="Direccion"  style="width: 15%"></Column>

                        <!-- <Column field="rfc" header="RFC" style="width: 35%">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.price) }}
                            </template>
                        </Column> -->
                        <Column style="width: 15%">
                            <template #header> View </template>
                            <template #body>
                                <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                            </template>
                        </Column>
                    </DataTable>
                </div>

            </div>
        </div>
    </div>
</template>
