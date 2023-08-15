import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const useNProgress = () => {
  NProgress.inc(0.4)
  NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: false })

  const start = () => {
    NProgress.start()
  }

  const done = () => {
    NProgress.done()
  }

  return {
    start,
    done
  }
}
