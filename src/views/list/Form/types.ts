export interface ISheetFormProps {
  visible: boolean
  title?: string
  mode?: 'ADD' | 'EDIT' | 'VIEW'
  data?: any
}

export interface ISheetFormEvent {
  (e: 'update:visible', value: boolean): void
}
