<script setup>
import { ref, computed, onUnmounted, onMounted, watch } from 'vue';
import { set1, set2, set3, set4, set5, set6, set7, set8, set9 } from '@/stores/galleryPhoto.js'

const photos = [set1, set2, set3, set4, set5, set6, set7, set8, set9]
const setOfPhoto = ref([])
const show = ref(null)
const maximized = ref(null)
const photoIndexNumber = ref(0)
const checkPhotoIndexNumber = computed(() => show.value)
let intervalId = null;

const coverPhoto = () => {
  photoIndexNumber.value += 1
  if (photoIndexNumber.value >= 4) {
    photoIndexNumber.value = 0
  }
  console.log(photoIndexNumber.value)
}

const showSet = (param) => {
  console.log(param.id)
  setOfPhoto.value = param.gallery
}

const maximizePhoto = (param) => {
  maximized.value = setOfPhoto.value.indexOf(param)
}
const closeSet = () => {
  show.value = false
  maximized.value = null
}
const close = () => {
  maximized.value = null
}

const switchToRight = () => {
  maximized.value += 1
  if (maximized.value >= 5) maximized.value = 0
}

const switchToLeft = () => {
  maximized.value -= 1
  if (maximized.value == -1) maximized.value = 4
}


/* watch(
  () => checkPhotoIndexNumber.value,
  (newValue) => {
    console.log(newValue);
    if (newValue === false) {
      // Start the interval if it hasn't already been started
      if (!intervalId) {
        intervalId = setInterval(() => {
          coverPhoto();
        }, 5000);
      }
    } else {
      // Stop the interval when `checkPhotoIndexNumber.value` is true
      clearInterval(intervalId);
      intervalId = null; // Reset the interval ID
    }
  }
);

onMounted(() => {show.value = false});
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
}); */

</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="!show" class="mx-28 flex flex-wrap justify-center gap-1 mt-16 image-container">
      <div v-for="item in photos" :key="item.id"  >
        <div @click="showSet(item)" class="group relative" >
          <img :src="item.gallery[photoIndexNumber]" @click="show = true" alt="Image" class="flex h-96">
          <div class="hidden group-hover:block absolute bottom-10 right-0 bg-white text-black p-2 uppercase">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <transition name="fade" mode="out-in">
        <div v-if="show && !setOfPhoto[maximized]" class="mx-56 flex justify-center relative gap-1 mt-16 bg-stone-100">
          <div class="mx-28 flex flex-wrap justify-center gap-1 ">
            <div class="flex flex-wrap justify-center">
              <div v-for="(item, index) in setOfPhoto">
                <img :src="item" class=" h-[500px] m-px " @click="maximizePhoto(item)">
              </div>
            </div>
          </div>
          <button @click="closeSet()" class=" h-12 w-24 p-2 absolute right-0 bg-stone-300 uppercase ">Close</button>
        </div>
        <div v-else-if="setOfPhoto[maximized]"
          class=" relative top-16 mx-56 flex bg-stone-200 flex-wrap  justify-between">
          <button @click="switchToLeft()" class="px-5 h-96 bg-stone-300 my-auto uppercase">Left</button>
          <img :src="setOfPhoto[maximized]" alt="" class="  h-[800px] " />
          <button @click="switchToRight()" class="px-5 h-96 bg-stone-300 my-auto uppercase">Right</button>
          <button @click="close()" class="px-5 h-12 right-0 absolute bg-stone-300 uppercase">Close</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 1s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Default: All images are colored */
.image-container img {
  filter: grayscale(0%);
  transition: filter 0.3s ease;
  /* Smooth transition */
}

/* When hovering over the container, make all images grayscale */
.image-container:hover img {
  filter: grayscale(70%);
}

/* Keep the hovered image colored */
.image-container img:hover {
  filter: grayscale(0%);

}
</style>