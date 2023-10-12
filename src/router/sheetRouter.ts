const sheetRoutes: Array<any> = [
  {
    path: '/sheet',
    name: 'Sheet',
    component: () => import('@/layout/index.vue'),
    meta: { title: '电子表格', icon: 'system' },
    redirect: { name: 'List' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/list/index.vue'),
        name: 'List',
        meta: { title: '表格管理', icon: '' }
      },
      {
        path: 'template',
        component: () => import('@/views/template/index.vue'),
        name: 'Template',
        meta: { title: '模板管理', icon: '' }
      },
      {
        path: 'design',
        component: () => import('@/views/design/index.vue'),
        name: 'Design',
        hidden: true,
        meta: { title: '表格设计', icon: '', activeMenu: '/sheet/list' }
      }
    ]
  },
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/layout/parentLayout.vue'),
    meta: { title: '电子表格填报', icon: 'system' },
    redirect: { name: 'Fill' },
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/preview/index.vue'),
        name: 'Fill',
        meta: { title: '电子表格填报', icon: '' }
      }
    ]
  }
]

export default sheetRoutes
