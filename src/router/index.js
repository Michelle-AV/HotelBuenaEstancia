import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/clientes',
                    name: 'Clientes',
                    component: () => import('@/views/pages/clientes/listClientes.vue')
                },
                {
                    path: '/reservacion/registrar',
                    name: 'Registrar',
                    component: () => import('@/views/pages/reservaciones/registerReservacion.vue')
                },
                {
                    path: '/reservacion/pendientes',
                    name: 'Pendientes',
                    component: () => import('@/views/pages/reservaciones/listReservasP.vue')
                },
                {
                    path: '/estancias',
                    name: 'Estancias',
                    component: () => import('@/views/pages/estancia/formEstancias.vue')
                },
                {
                    path: '/historial/habitaciones',
                    name: 'Habitaciones',
                    component: () => import('@/views/pages/historial/Habitaciones.vue')
                },
                {
                    path: '/historial/servicios',
                    name: 'Servicios',
                    component: () => import('@/views/pages/historial/Servicios.vue')
                },
                {
                    path: '/historial/reservas',
                    name: 'Reservas',
                    component: () => import('@/views/pages/historial/reservasTotal.vue')
                },
                {
                    path: '/factura',
                    name: 'Facturacion',
                    component: () => import('@/views/pages/facturacion/nuevaFactura.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/test',
            name: 'Testing',
            component: () => import('@/views/pages/Tests/sockets.vue')
        },
    ]
});

export default router;
