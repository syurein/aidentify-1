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
</script>

<template>
  <div class="relative block bg-[#90838059] w-[90vw] rounded-xl backdrop-blur-sm">
    <button class="position absolute right-0 invert"><img src="@/assets/images/x.svg" class="w-6 h-6 mr-3 mt-3"
        @click="store.router('title')"></button>
    <h2 class="text-3xl font-bold text-center text-white p-7">画像をアップロード</h2>
    <div><button @click="openFileDialog"
        class="relative left-[50%] translate-x-[-50%] rounded-xl bg-indigo-400 text-xl px-5 py-4 font-bold bg-indigo-500 text-white w-[80vw]">Upload
        image</button>
    </div>
    <div class="mt-4">
      <button @click="store.router('take')"
        class="relative left-[50%] translate-x-[-50%] rounded-xl bg-indigo-400 text-xl px-5 py-4 font-bold bg-indigo-500 text-white w-[80vw]">Take
        photo</button>
    </div>
    <input type="file" ref="fileInput" @change="upload" id="uploadImage" accept="image/*" hidden>
    <div class="h-40"></div>
  </div>
</template>