<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Menú',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }]
    },
    {
        label: 'Clientes',
        items: [{ label: 'Lista de clientes', icon: 'pi pi-fw pi-user', to: '/clientes' }]
    },
    {
        label: 'Reservaciones',
        icon: 'pi pi-fw pi-briefcase',
        to: '/reservacion',
        items: [
            {
                label: 'Registrar reservación',
                icon: 'pi pi-fw pi-pencil',
                to: '/reservacion/registrar'
            },
            {
                label: 'Reservas pendientes',
                icon: 'pi pi-fw pi-ticket',
                to: '/reservacion/pendientes'
            },
        ]
    },
    {
        label: 'Estancia',
        items: [{ label: 'Nueva estancia', icon: 'pi pi-fw pi-plus', to: '/estancias' }]
    },
    {
        label: 'Historial',
        icon: 'pi pi-fw pi-briefcase',
        to: '/historial',
        items: [
            {
                label: 'Habitaciones',
                icon: 'pi pi-fw pi-moon',
                to: '/historial/habitaciones'
            },
            {
                label: 'Servicios',
                icon: 'pi pi-fw pi-id-card',
                to: '/historial/servicios'
            },
            {
                label: 'Total reservas',
                icon: 'pi pi-fw pi-table',
                to: '/historial/reservas'
            },
        ]
    },
    {
        label: 'Facturación',
        items: [{ label: 'Generar factura', icon: 'pi pi-fw pi-book', to: '/factura' }]
    },
    {
        label: 'ADMIN',
        items: [{ label: 'Crear cuenta', icon: 'pi pi-fw pi-user', to: '/createacc' }]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/crud'
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/pages/timeline'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
