<script>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import axios from 'axios';

import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

export default {
    setup() {

        const toast = useToast();

        const { layoutConfig } = useLayout();
        const nomUser = ref('');
        const password = ref('');
        const router = useRouter();

        const logoUrl = computed(() => {
            return `layout/images/${layoutConfig.darkTheme.value ? 'BE-logo1' : 'BE-logo1'}.png`;
        });

        async function checkLogin(){
            if(nomUser.value.trim() != '' && password.value != ''){
                axios.get(`http://localhost:8080/hotelbe/empleado/${nomUser.value.trim()}/${password.value}`,
                ).then(response => {
                    console.log("Response: ", response);
                    if(Object.keys(response.data).length > 0){
                        router.push("/dashboard");
                        toast.add({ severity: 'success', summary: 'Si existe', detail: 'Si existen los datos.', life: 4000 });
                        nomUser.value == '';
                        password.value == '';
                    } else {
                        toast.add({ severity: 'error', summary: 'Error: No se pudo iniciar', detail: 'No existen los datos ingresados', life: 4000 });
                    }
                });
            } else {
                toast.add({ severity: 'warn', summary: 'Verifica', detail: 'Checa que los datos esten llenos correctamente', life: 2000 });
            }
        }

        return {
            nomUser,
            password,
            checkLogin
        };

    }
};

</script>

<template>
    <Toast />
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/BE-logo1.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">¡Bienvenido de vuelta!</div>
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>

                    <div>
                        <label for="nomUser" class="block text-900 text-xl font-medium mb-2">Nombre de usuario:</label>
                        <InputText id="nomUser" type="text" placeholder="Usuario" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="nomUser" />

                        <label for="password" class="block text-900 font-medium text-xl mb-2">Contraseña:</label>
                        <Password id="password" v-model="password" placeholder="Contraseña" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <Button label="Iniciar" class="w-full p-3 mt-5 text-xl" @click="checkLogin()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
