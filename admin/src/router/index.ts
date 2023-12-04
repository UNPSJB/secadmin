import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
import UIRoute from '../pages/admin/ui/route'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'aulas-menu',
        path: 'aulas',
        component: RouteViewComponent,
        children: [
          {
            name: 'aulas',
            path: '',
            component: () => import('../pages/admin/aulas/Aulas.vue'),
          },
          {
            name: 'nueva-aula',
            path: 'form',
            component: () => import('../pages/admin/aulas/AulaForm.vue'),
          },
          {
            name: 'editar-aula',
            path: 'form/:id',
            component: () => import('../pages/admin/aulas/AulaForm.vue'),
          },
        ],
      },
      {
        name: 'change-password',
        path: 'change-password',
        component: () => import('../pages/admin/change-password/ChangePassword.vue'),
      },
      {
        name: 'empresas-menu',
        path: 'empresas',
        component: RouteViewComponent,
        children: [
            {
              name: 'empresas',
              path: '',
              component: () => import('../pages/admin/empresas/Empresas.vue'),
            },
            {
              name: 'nueva-empresa',
              path: 'form',
              component: () => import('../pages/admin/empresas/EmpresaForm.vue'),
            },
            {
              name: 'editar-aula',
              path: 'form/:id',
              component: () => import('../pages/admin/empresas/EmpresaForm.vue'),
            }            
        ]
        
      },
      {
        name: 'afiliados-menu',
        path: 'afiliados',
        component: RouteViewComponent,
        children: [
            {
              name: 'afiliados',
              path: '',
              component: () => import('../pages/admin/afiliados/Afiliados.vue'),
            },
            {
              name: 'nuevo-afiliado',
              path: 'form',
              component: () => import('../pages/admin/afiliados/AfiliadoForm.vue'),
            },
            {
              name: 'editar-afiliado',
              path: 'form/:id',
              component: () => import('../pages/admin/afiliados/AfiliadoForm.vue'),
            }            
        ]
        
      },
      {
        name: 'cursos-menu',
        path: 'cursos',
        component: RouteViewComponent,
        children: [
          {
            name: 'cursos',
            path: '',
            component: () => import('../pages/admin/cursos/Cursos.vue'),
          },
          {
            name: 'nuevo-curso',
            path: 'form',
            component: () => import('../pages/admin/cursos/CursoForm.vue'),
          },
          {
            name: 'editar-curso',
            path: 'form/:id',
            component: () => import('../pages/admin/cursos/CursoForm.vue'),
          },
        ],
      },
      {
        name: 'dictado-menu',
        path: 'dictados',
        component: RouteViewComponent,
        children: [
          {
            name: 'nuevo-dictado',
            path: 'form/:cursoId',
            component: () => import('../pages/admin/cursos/DictadoForm.vue'),
          },
          {
            name: 'editar-dictado',
            path: 'form/:cursoId/:dictadoId',
            component: () => import('../pages/admin/cursos/DictadoForm.vue'),
          },
        ],
      },
      
      {
        name: 'inscripto-menu',
        path: 'inscriptos',
        component: RouteViewComponent,
        children: [
          {
            name: 'nuevo-inscripto',
            path: 'form/:cursoId/:dictadoId',
            component: () => import('../pages/admin/cursos/InscriptoForm.vue'),
          },
          {
            name: 'editar-inscripto',
            path: 'form/:cursoId/:dictadoId/:inscriptoId',
            component: () => import('../pages/admin/cursos/InscriptoForm.vue'),
          },
        ],
      },
      {
      name: 'profesores-menu',
        path: 'profesores',
        component: RouteViewComponent,
        children: [
            {
              name: 'profesores',
              path: '',
              component: () => import('../pages/admin/profesor/profesor.vue'),
            },
            {
              name: 'nuevo-profesor',
              path: 'form',
              component: () => import('../pages/admin/profesor/profesorForm.vue'),
            },
            {
              name: 'editar-profesor',
              path: 'form/:id',
              component: () => import('../pages/admin/profesor/profesorForm.vue'),
            }            
        ]
        
      },
      {
        name: 'statistics',
        path: 'statistics',
        component: RouteViewComponent,
        children: [
          {
            name: 'charts',
            path: 'charts',
            component: () => import('../pages/admin/statistics/charts/Charts.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Charts',
            },
          },
          {
            name: 'progress-bars',
            path: 'progress-bars',
            component: () => import('../pages/admin/statistics/progress-bars/ProgressBars.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
        ],
      },
      {
        name: 'forms',
        path: 'forms',
        component: RouteViewComponent,
        children: [
          {
            name: 'form-elements',
            path: 'form-elements',
            component: () => import('../pages/admin/forms/form-elements/FormElements.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/inputs',
            },
          },
          {
            name: 'medium-editor',
            path: 'medium-editor',
            component: () => import('../pages/admin/forms/medium-editor/MediumEditor.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Medium-Editor',
            },
          },
        ],
      },
      {
        name: 'maps',
        path: 'maps',
        component: RouteViewComponent,
        children: [
          {
            name: 'maplibre-maps',
            path: 'maplibre-maps',
            component: () => import('../pages/admin/maps/maplibre-maps/MapLibreMapsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
          {
            name: 'yandex-maps',
            path: 'yandex-maps',
            component: () => import('../pages/admin/maps/yandex-maps/YandexMapsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
          {
            name: 'leaflet-maps',
            path: 'leaflet-maps',
            component: () => import('../pages/admin/maps/leaflet-maps/LeafletMapsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
          {
            name: 'bubble-maps',
            path: 'bubble-maps',
            component: () => import('../pages/admin/maps/bubble-maps/BubbleMapsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
          {
            name: 'line-maps',
            path: 'line-maps',
            component: () => import('../pages/admin/maps/line-maps/LineMapsPage.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Maps',
            },
          },
        ],
      },
      {
        name: 'tables',
        path: 'tables',
        component: RouteViewComponent,
        children: [
          {
            name: 'markup',
            path: 'markup',
            component: () => import('../pages/admin/tables/markup-tables/MarkupTables.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
            },
          },
          {
            name: 'data',
            path: 'data',
            component: () => import('../pages/admin/tables/data-tables/DataTables.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
            },
          },
        ],
      },
      {
        name: 'pages',
        path: 'pages',
        component: RouteViewComponent,
        children: [
          {
            name: '404-pages',
            path: '404-pages',
            component: () => import('../pages/admin/pages/404PagesPage.vue'),
          },
          {
            name: 'faq',
            path: 'faq',
            component: () => import('../pages/admin/pages/FaqPage.vue'),
          },
        ],
      },
      UIRoute,
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scrollTo(0, 0)
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requireAuth && !authStore.token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
