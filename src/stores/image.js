import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {

  const data = ref({})
  const takedata = ref({})

  return { data, takedata }
})
