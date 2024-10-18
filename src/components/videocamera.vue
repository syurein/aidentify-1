<template>
  <div class="bg-black h-dvh w-screen">
    <video ref="video" autoplay class="position absolute top-1/2 translate-y-[-50%] w-screen"></video>
    <img :src="photoData" v-if="photoData" class="w-screen position absolute top-1/2 translate-y-[-50%]" alt="撮影された写真" />
    <button @click="capturePhoto" class="w-16 h-16 bg-white rounded-full absolute left-1/2 translate-x-[-50%] bottom-5 ">撮影</button>
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useImageStore } from '@/stores/image.js'
const image = useImageStore()
import { useRouter } from 'vue-router'

const router = useRouter()

// リアクティブな変数を定義
const video = ref(null);
const canvas = ref(null);
const photoData = ref(null);

// カメラにアクセスするメソッド
const startCamera = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.value.srcObject = stream;
    })
    .catch(err => {
      console.error("カメラへのアクセスに失敗しました: ", err);
    });
};

// 写真を撮るメソッド
const capturePhoto = () => {
  const context = canvas.value.getContext('2d');
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  // 画像データをBase64形式で取得
  photoData.value = canvas.value.toDataURL('image/png');
  image.data = photoData.value
  router.push("edit")
};

// コンポーネントがマウントされた時にカメラを開始する
onMounted(() => {
  startCamera();
});
</script>