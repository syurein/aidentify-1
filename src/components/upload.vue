<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { useImageStore } from '@/stores/image.js'
import { useViewControlStore } from '@/stores/viewcontrol.js'
import Videocamera from './videocamera.vue';
const store = useViewControlStore()

const image = useImageStore()

const router = useRouter()
const takephoto = ref(false)
const fileInput = ref(null);

const openFileDialog = () => {
  fileInput.value.click();
};

const upload = (event) => {

  const reader = new FileReader();
  reader.onload = () => {
    const type = reader.result.split(';')[0].split(':')[1];
    if (type === 'image/png') {
      console.log('PNGファイルです');
      alert("対応していない画像形式(png)")
    } else {
      console.log('PNGファイルではありません');
      // FileReader API を使って画像データを base64 文字列に変換
      const reader2 = new FileReader();
      reader2.readAsDataURL(document.getElementById('uploadImage').files[0]);
      reader2.onload = () => {
        image.data = reader2.result;
      };
      router.push("edit")
    }
  };
  reader.readAsDataURL(document.getElementById('uploadImage').files[0]);
};

const dialog = ref(false)
</script>

<template>
  <div class="relative block bg-[#90838059] w-[90vw] rounded-xl backdrop-blur-sm">
    <button class="position absolute right-0 invert"><img src="@/assets/images/x.svg" class="w-6 h-6 mr-3 mt-3"
        @click="store.router('title'); dialog = false"></button>
    <h2 class="text-3xl font-bold text-center text-white p-7">画像をアップロード</h2>
    <div><button @click="dialog = true"
        class="relative left-[50%] translate-x-[-50%] rounded-xl bg-indigo-400 text-xl px-5 py-4 font-bold bg-indigo-500 text-white w-[80vw]">Upload
        image</button>
    </div>
    <Transition>
      <div class="mt-4 flex flex-wrap w-48 shadow-lg shadow-black-500/50 ml-5" v-show="dialog">
        <button @click="openFileDialog"
          class="rounded-t-[0.6rem] bg-[#ffffffaa] text-sm px-3 py-2 text-black w-48 hover:bg-[#ffffff99] text-left">写真ライブラリ
          <img src="@/assets/images/picture.svg" class="ml-[45px] inline-block invert w-5"></button>
        <button @click="store.router('take')"
          class="bg-[#ffffffaa] text-sm px-3 py-2 text-black w-48 mt-[1px] hover:bg-[#ffffff7e] text-left">写真を撮る <img
            src="@/assets/images/camera-b.svg" class="ml-[73px] inline-block invert w-5"></button>
        <button @click="openFileDialog"
          class="rounded-b-[0.6rem] bg-[#ffffffaa] text-sm px-3 py-2 text-black mt-[1px] w-48 hover:bg-[#ffffff7e] text-left">ファイルを選択
          <img src="@/assets/images/folder.svg" class="ml-[45px] inline-block invert w-5"></button>
      </div>
    </Transition>
    <input type="file" ref="fileInput" @change="upload" id="uploadImage" accept="image/*" hidden>
    <div class="h-40"></div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
</style>