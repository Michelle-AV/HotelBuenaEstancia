<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import Calendar from 'primevue/calendar';


const { isDarkTheme } = useLayout();

const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <router-link to="/historial/habitaciones" class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Habitaciones</span>
                        <div class="text-900 font-medium text-xl">Habitaciones registradas</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-arrow-right text-green-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </router-link>
        <router-link to="/reservacion/registrar" class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Reservas</span>
                        <div class="text-900 font-medium text-xl">Nueva reservación</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-pencil text-orange-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </router-link>
        <router-link to="/estancias" class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Estancia</span>
                        <div class="text-900 font-medium text-xl">Nueva estancia</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-plus text-cyan-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </router-link>
        <router-link to="/factura" class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Facturación</span>
                        <div class="text-900 font-medium text-xl">Facturas generadas</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-book text-purple-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
    <div class="body-dashboard">
        <div id="miDiv">
            <img src="../../public/layout/images/BE-Logo.png" alt="Descripción de la imagen">
        </div>
        <h1>Bienvenido(a) al sistema de gestión para el <br> Hotel Buena Estancia</h1>
    </div>
</template>

<style scoped>
    .body-dashboard {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50vh;
        text-align: center;
    }
    .body-dashboard h1 {
        display: block;
        text-align: left;
        margin-left: 50px;
    }
    #miDiv {
        display: block;
        width: 200px; /* Ancho deseado */
        height: 100px; /* Alto deseado */
    }
    #miDiv img {
        width: 100%; /* La imagen ocupará el 100% del ancho del contenedor */
        height: 100%; /* La imagen ocupará el 100% del alto del contenedor */
        object-fit: cover; /* Ajustar la imagen para cubrir el área del contenedor */
    }
</style>
