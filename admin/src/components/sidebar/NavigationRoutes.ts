export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'afiliados',
      displayName: 'Afiliados',
      meta: {
        icon: 'material-icons-school',
      },
      disabled: true,
      children: [
        {
          name: 'afiliados',
          displayName: 'Listado de afiliados',
        },
        {
          name: 'nuevo-afiliado',
          displayName: 'Nuevo afiliado',
        },
      ],
    },
    {
      name: 'aulas',
      displayName: 'menu.aulas',
      meta: {
        icon: 'material-icons-school',
      },
      disabled: true,
      children: [
        {
          name: 'aulas',
          displayName: 'Listado de aulas',
        },
        {
          name: 'nueva-aula',
          displayName: 'Nueva aula',
        },
      ],
    },
    {
      name: 'profesores',
      displayName: 'Profesores',
      meta: {
        icon: 'material-icons-school',
      },
      disabled: true,
      children: [
        {
          name: 'profesores',
          displayName: 'Listado de profesores',
        },
        {
          name: 'nuevo-profesor',
          displayName: 'Nuevo profesores',
        },
      ],
    },
    {
      name: 'empresas',
      displayName: 'Empresas',
      meta: {
        icon: 'material-icons-business',
      },
      disabled: true,
      children: [
        {
          name: 'empresas',
          displayName: 'Listado de empresas',
        },
        {
          name: 'nueva-empresa',
          displayName: 'Nueva empresa',
        },
      ],
    },
    {
      name: 'cursos',
      displayName: 'Cursos',
      meta: {
        icon: 'material-icons-school',
      },
      disabled: true,
      children: [
        {
          name: 'cursos',
          displayName: 'Listado de cursos',
        },
        {
          name: 'nuevo-curso',
          displayName: 'Nuevo curso',
        },
      ],
    },
    // {
    //   name: 'statistics',
    //   displayName: 'menu.statistics',
    //   meta: {
    //     icon: 'vuestic-iconset-statistics',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'charts',
    //       displayName: 'menu.charts',
    //     },
    //     {
    //       name: 'progress-bars',
    //       displayName: 'menu.progressBars',
    //     },
    //   ],
    // },
    // {
    //   name: 'forms',
    //   displayName: 'menu.forms',
    //   meta: {
    //     icon: 'vuestic-iconset-forms',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'form-elements',
    //       displayName: 'menu.formElements',
    //     },
    //     {
    //       name: 'medium-editor',
    //       displayName: 'menu.mediumEditor',
    //     },
    //   ],
    // },
    // {
    //   name: 'tables',
    //   displayName: 'menu.tables',
    //   meta: {
    //     icon: 'vuestic-iconset-tables',
    //   },
    //   children: [
    //     {
    //       name: 'markup',
    //       displayName: 'menu.markupTables',
    //     },
    //     // {
    //     //   name: 'data',
    //     //   displayName: 'menu.dataTables',
    //     // },
    //   ],
    // },
    // {
    //   name: 'ui',
    //   displayName: 'menu.uiElements',
    //   meta: {
    //     icon: 'vuestic-iconset-ui-elements',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'buttons',
    //       displayName: 'menu.buttons',
    //     },
    //     {
    //       name: 'cards',
    //       displayName: 'menu.cards',
    //     },
    //     {
    //       name: 'chat',
    //       displayName: 'menu.chat',
    //     },
    //     {
    //       name: 'chips',
    //       displayName: 'menu.chips',
    //     },
    //     {
    //       name: 'collapses',
    //       displayName: 'menu.collapses',
    //     },
    //     {
    //       name: 'colors',
    //       displayName: 'menu.colors',
    //     },
    //     {
    //       name: 'color-pickers',
    //       displayName: 'menu.colorPickers',
    //     },
    //     {
    //       name: 'file-upload',
    //       displayName: 'menu.fileUpload',
    //     },
    //     {
    //       name: 'icon-sets',
    //       displayName: 'menu.icons',
    //       children: [
    //         {
    //           displayName: 'concrete',
    //           name: 'icon-set',
    //         },
    //       ],
    //     },
    //     {
    //       name: 'lists',
    //       displayName: 'menu.lists',
    //     },
    //     {
    //       name: 'modals',
    //       displayName: 'menu.modals',
    //     },
    //     {
    //       name: 'notifications',
    //       displayName: 'menu.notifications',
    //     },
    //     {
    //       name: 'popovers',
    //       displayName: 'menu.popovers',
    //     },
    //     {
    //       name: 'rating',
    //       displayName: 'menu.rating',
    //     },
    //     {
    //       name: 'sliders',
    //       displayName: 'menu.sliders',
    //     },
    //     {
    //       name: 'spinners',
    //       displayName: 'menu.spinners',
    //     },
    //     {
    //       name: 'tabs',
    //       displayName: 'menu.tabs',
    //     },
    //     // {
    //     //   name: "timelines",
    //     //   displayName: "menu.timelines",
    //     // },
    //     {
    //       name: 'tree-view',
    //       displayName: 'menu.treeView',
    //     },
    //     {
    //       name: 'typography',
    //       displayName: 'menu.typography',
    //     },
    //   ],
    // },
    // {
    //   name: 'maps',
    //   displayName: 'menu.maps',
    //   meta: {
    //     icon: 'vuestic-iconset-maps',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'maplibre-maps',
    //       displayName: 'menu.maplibre-maps',
    //     },
    //     {
    //       name: 'yandex-maps',
    //       displayName: 'menu.yandex-maps',
    //     },
    //     {
    //       name: 'leaflet-maps',
    //       displayName: 'menu.leaflet-maps',
    //     },
    //     {
    //       name: 'bubble-maps',
    //       displayName: 'menu.bubble-maps',
    //     },
    //     {
    //       name: 'line-maps',
    //       displayName: 'menu.line-maps',
    //     },
    //   ],
    // },
    // {
    //   name: 'pages',
    //   displayName: 'menu.pages',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login-singup',
    //     },
    //     {
    //       name: '404-pages',
    //       displayName: 'menu.404-pages',
    //     },
    //     {
    //       name: 'faq',
    //       displayName: 'menu.faq',
    //     },
    //   ],
    // },
  ] as INavigationRoute[],
}
