<script>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import axios from 'axios';
import Listbox from 'primevue/listbox';

import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

export default {
    setup() {
        const toast = useToast();

        const nomEmp = ref('');
        const nomUser = ref('');
        const password = ref('');

        async function createUser() {
            // console.log("A: ", rolSeleccionado.value.name);
            if(nomEmp.value.trim() != '' && nomUser.value.trim() != '' && password.value != '' && rolSeleccionado.value){
                if(rolSeleccionado.value.name === 'Administrador'){
                    axios.post(`http://localhost:8080/hotelbe/empleado/new`, {
                        "nombreEmpleado": nomEmp.value,
                        "userEmpleado": nomUser.value,
                        "passEmpleado": password.value,
                        "cargoRol": 1
                    }).then(response => {
                        toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registró el usuario administrador.', life: 4000 });
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                    });
                } else if (rolSeleccionado.value.name === 'Recepcionista'){
                    axios.post(`http://localhost:8080/hotelbe/empleado/new`, {
                        "nombreEmpleado": nomEmp.value,
                        "userEmpleado": nomUser.value,
                        "passEmpleado": password.value,
                        "cargoRol": 2
                    }).then(response => {
                        toast.add({ severity: 'success', summary: 'Registro exitoso', detail: 'Se registró el usuario recepcionista.', life: 4000 });
                    }).catch(error => {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo agregar', detail: 'Verifique los datos: '+ error, life: 4000 });
                    });
                }
            } else {
                toast.add({ severity: 'warn', summary: 'Verifica:', detail: 'Checa que todos ls datos esten completos', life: 4000 });
            }

            // if({
            //     toast.add({ severity: 'error', summary: 'Error:', detail: 'No se pueden dar roles a un usuario', life: 4000 });
            // } else {
            //     toast.add({ severity: 'success', summary: 'Error:', detail: 'No se pueden dar roles a un usuario', life: 4000 });
            // }
        }

        const rolSeleccionado = ref();
        const roles = ref([
            { name: 'Administrador', code: 'NY' },
            { name: 'Recepcionista', code: 'RM' }
        ]);

        return {
            rolSeleccionado,
            roles,
            nomEmp,
            nomUser,
            password,
            createUser
        };
    }
};
</script>



<template>
    <div class="grid">
        <Toast />
        <div class="col-12">
            <div class="card">
                <h3>Cuentas</h3>
                <TabView>
                    <TabPanel header="Crear nueva cuenta">
                        <p class="m-0 mt-3">
                            <h6>Ingresa el nombre del trabajador:</h6>
                            <span class="mt-5 p-float-label">
                                <InputText id="nomEmp" v-model="nomEmp" />
                                <label for="nomEmp">Nombre del empleado</label>
                            </span>
                            <h6>Ingresa el nombre de usuario:</h6>
                            <span class="mt-5 p-float-label">
                                <InputText id="nomUser" v-model="nomUser" />
                                <label for="nomUser">Usuario</label>
                            </span>
                            <h6>Contraseña del usuario:</h6>
                            <span class="mt-5 p-float-label">
                                <Password v-model="password" inputId="password" toggleMask />
                                <label for="password">Contraseña</label>
                            </span>

                            <h6>Rol del usuario:</h6>
                            <Listbox v-model="rolSeleccionado" :options="roles" optionLabel="name" class="w-full md:w-14rem" />
                        </p>
                        <div class="text-right">
                            <Button label="Crear" icon="pi pi-user" @click="createUser()"/>
                        </div>
                    </TabPanel>
                    <TabPanel header="Lista de cuentas creadas">
                        <p class="m-0 mt-3">
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    </div>
</template>
