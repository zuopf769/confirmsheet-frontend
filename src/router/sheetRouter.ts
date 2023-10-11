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
        path: 'design',
        component: () => import('@/views/design/index.vue'),
        name: 'Design',
        hidden: true,
        meta: { title: '表格设计', icon: '', activeMenu: '/sheet/list' }
      }
    ]
  }
]

export default sheetRoutes
