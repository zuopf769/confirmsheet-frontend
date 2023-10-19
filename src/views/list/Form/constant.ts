export const FormContent = [
  {
    type: 'input',
    id: 'sheetName',
    label: '名称',
    attrs: { 'data-name': 'form1' },
    el: {
      size: 'default',
      placeholder: '请输入表格名称'
    },
    rules: [
      { required: true, message: '请输入表格名称', trigger: 'blur' },
      { max: 15, message: '表格名称最大长度为15', trigger: 'blur' }
    ]
  },
  {
    type: 'select',
    id: 'sheetType',
    label: '类型',
    options: [
      {
        label: '列维度',
        value: 'col'
      },
      {
        label: '单元格维度',
        value: 'cell'
      }
    ],
    rules: [{ required: true, message: '请选择表格类型', trigger: 'change' }]
  },
  {
    type: 'select',
    id: 'template',
    label: '模板',
    options: [
      {
        label: '空模板',
        value: 'null'
      }
    ],
    rules: [{ required: true, message: '请选择表格模板类型', trigger: 'change' }]
  }
]
