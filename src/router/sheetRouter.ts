const sheetRoutes: Array<any> = [
  {
    path: '/sheet',
    name: 'Sheet',
    component: () => import('@/layout/index.vue'),
    meta: { title: '确认表格', icon: 'system' },
    redirect: { name: 'Design' },
    children: [
      {
        path: 'design',
        component: () => import('@/views/Design/index.vue'),
        name: 'Design',
        meta: { title: '设计表格', icon: '' }
      }
    ]
  }
]

export default sheetRoutes
