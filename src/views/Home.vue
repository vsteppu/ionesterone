<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { contentImages } from '@/utilities/contentImages';

const showText = ref(false)
const title = ref('First Image')
const homeImage = ref(0)
const image = ref(contentImages[0])

const changeHomeImage = () => {
  homeImage.value++
  if(homeImage.value === 3){
    homeImage.value = 0 
  }
  showText.value = false;
}

const onAfterEnter = () => {
  showText.value = true; // Show text after image transition is complete
};

const currentImage = computed(() => homeImage.value)

onMounted(() => {
  setInterval(() => {
    changeHomeImage();
  }, 7000);
});

watch(
  () => currentImage.value,
  () => {
    if(currentImage.value === 0) {
      setTimeout(()=>image.value=contentImages[0],1000)
    }else if(currentImage.value === 1) {
      setTimeout(()=>image.value=contentImages[1],1000)
      title.value='Second Image'
    }else if(currentImage.value === 2) {
      setTimeout(()=>image.value=contentImages[2],1000)
      title.value='third Image'
    }
  }
)
</script>

<template>
  <div class="flex justify-center  h-screen overflow-hidden bg-slate-800 ">
  <img 
    :src="image" 
    class="z-0 flex absolute m-auto blur-xl  w-full h-full"
  >
    <div 
      class=" z-10 my-auto top-8 rounded-lg flex h-4/5 relative ">
      <transition
        name="slide-in"
        mode="out-in"
      >
          <img 
            v-if="currentImage === 0" 
            src="../media/set1/1.jpg" 
            class=" w-full h-full rounded-lg shadow-xl"
          >
          <img 
            v-else-if="currentImage === 1" 
            src="../media/set2/1.jpg" 
            class=" w-full h-full rounded-lg shadow-xl"
          >
          <img 
            v-else-if="currentImage === 2" 
            src="../media/set3/1.jpg" 
            class=" w-full h-full rounded-lg shadow-xl"
          >
      </transition>
      <transition
        name="fade"
        @after-enter="onAfterEnter"
        mode="out-in"
      >
        <div v-if="currentImage === 0" class=" top-3/4 absolute right-5 text-end text-white">
            <p class="text-3xl font-bold blur-none uppercase ">Midnight Muse</p>
            <p class="text-lg font-semibold ">Embracing the warmth of elegance with curls that crown her beauty</p>

        </div>
        <div v-else-if="currentImage === 1" class=" top-3/4 absolute right-5 text-end text-black ">
          <p class="text-3xl font-bold blur-none uppercase ">Autumn Connection</p>
          <p class="text-lg font-semibold ">When falling leaves reveal budding feelings</p>
        </div>
        <div v-else-if="currentImage === 2" class=" top-3/4 absolute right-5 text-end text-white ">
          <p class="text-3xl font-bold blur-none uppercase ">Parisian Grace</p>
          <p class="text-lg font-semibold ">A vision in pink, where elegance meets the city of love.</p>
        </div>
      </transition>
    </div>
  </div>
  <div>
  </div>

</template>


<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 1s ease-out;
}

.slide-in-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.slide-in-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}

.fade-enter-active {
  transition: opacity 2s ease;
}
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to  {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from  {
  opacity: 1;
}

</style>