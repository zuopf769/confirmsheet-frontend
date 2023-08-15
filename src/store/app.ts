interface AppStore {
  sidebarHide: boolean
}

const defaultState: AppStore = {
  sidebarHide: false
}
const useAppStore = defineStore('app', {
  state: () => defaultState,
  getters: {
    getSidebarHide: (state) => state.sidebarHide
  },
  actions: {
    setAppData<K extends keyof AppStore>(key: K, value) {
      this[key] = value
    }
  }
})

export default useAppStore
