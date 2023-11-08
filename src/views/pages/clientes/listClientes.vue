<script setup>
    import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
    import { ref, onMounted } from 'vue';
    import ColumnGroup from 'primevue/columngroup';
    import Row from 'primevue/row';
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

    // Datos estáticos
    const clientes = ref([
        {
            name: 'Juan',
            apPat: 'Pérez',
            apMat: 'García',
            tel: '555-123-4567',
            rfc: 'ABCD123456',
            email: 'juan@example.com',
            direc: 'Calle 123'
        },
        {
            name: 'María',
            apPat: 'López',
            apMat: 'Hernández',
            tel: '555-987-6543',
            rfc: 'EFGH789012',
            email: 'maria@example.com',
            direc: 'Avenida XYZ'
        },
    ]);
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
                        <Column field="name" header="Nombre"  style="width: 10%"></Column>
                        <Column field="apPat" header="Apellido Paterno"  style="width: 10%"></Column>
                        <Column field="apMat" header="Apellido Materno"  style="width: 10%"></Column>
                        <Column field="tel" header="Telefono"  style="width: 15%"></Column>
                        <Column field="rfc" header="RFC"  style="width: 15%"></Column>
                        <Column field="email" header="Email"  style="width: 15%"></Column>
                        <Column field="direc" header="Direccion"  style="width: 15%"></Column>
                        <Column field="edit" header="" style="width: 40%">
                            <template #body="slotProps">
                                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" />
                                <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" />
                            </template>
                        </Column>

                    </DataTable>
                </div>

            </div>
        </div>
    </div>
</template>
