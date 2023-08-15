import { TITLE_TYPES } from '@/constants/index'

export const useModalTitle = (title, props) => {
  const modelTitle = ref('')
  watch(
    () => props.mode,
    () => {
      modelTitle.value = `${TITLE_TYPES[props.mode]}${title}`
    }
  )
  return { modelTitle }
}
