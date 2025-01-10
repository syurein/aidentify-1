import { ref } from "vue"
import { defineStore } from 'pinia'

export const useUrlStore = defineStore('url', () => {

  //https://powerful-centrally-chimp.ngrok-free.app
  //https://cool-emu-learning.ngrok-free.app

  const type = {
    "w": "https://rein0421-aidentify.hf.space",
    "c": "https://rein0421-aidentify.hf.space",
    "p": "https://rein0421-aidentify.hf.space"
  }

  const change = (changeType) => {
    data.value = type[changeType]
  }

  const data = ref("https://rein0421-aidentify.hf.space")

  return { data, change }
})
