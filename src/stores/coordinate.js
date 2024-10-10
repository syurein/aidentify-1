import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCoordinateStore = defineStore('coordinate', () => {

  const data = ref({})
  const state = ref('simple-lama')
  const width = ref()
  const height = ref()

  return { data, state, width, height }
})
