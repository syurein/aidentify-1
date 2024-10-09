import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoordinateStore = defineStore('coordinate', () => {

  const data = ref({})

  return { data }
})
