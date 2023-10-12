export const defaultOptions = {
  container: 'luckysheet', // 设定DOM容器的id
  title: '表格名称', // 设定表格名称
  lang: 'zh', // 设定表格语言
  designMode: true, // 设计态
  isColumnMode: true, // 列维度表格
  showinfobar: false, // 顶部info条
  showsheetbar: false, // 底部sheet条
  enableAddRow: false, // 底部添加行按钮
  enableAddBackTop: false,
  data: [
    // 第一个工作表配置
    {
      row: 1,
      column: 8,
      defaultRowHeight: 36, // 自定义行高
      defaultColWidth: 100 // 自定义列宽
    }
  ]
}
