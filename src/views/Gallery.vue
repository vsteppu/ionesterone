<script setup>
import { ref, computed, onMounted } from 'vue';
import { set1, set2, set3, set4, set5, set6, set7, set8, set9 } from '@/stores/galleryPhoto.js'

const setOfPhoto = ref(null)

const showSet = (param) =>{
if(param.id === set1.id) setOfPhoto.value=set1.gallery
if(param.id === set2.id) setOfPhoto.value=set2.gallery
if(param.id === set3.id) setOfPhoto.value=set3.gallery
if(param.id === set4.id) setOfPhoto.value=set4.gallery
if(param.id === set5.id) setOfPhoto.value=set5.gallery
if(param.id === set6.id) setOfPhoto.value=set6.gallery
if(param.id === set7.id) setOfPhoto.value=set7.gallery
if(param.id === set8.id) setOfPhoto.value=set8.gallery
if(param.id === set9.id) setOfPhoto.value=set9.gallery
}

</script>

<template>
  <div class="  mx-28 flex flex-wrap justify-center gap-1 mt-16 image-container" >
    <img src="@/media/set1/1.jpg" @click="showSet(set1)" class="h-96">
    <img src="@/media/set2/1.jpg" @click="showSet(set2)" class="h-96">
    <img src="@/media/set3/2.jpg" @click="showSet(set3)" class="h-96">
    <img src="@/media/set7/1.jpg" @click="showSet(set7)" class="h-96">
    <img src="@/media/set4/1.jpg" @click="showSet(set4)" class="h-96">
    <img src="@/media/set5/2.jpg" @click="showSet(set5)" class="h-96">
    <img src="@/media/set6/2.jpg" @click="showSet(set6)" class="h-96">
    <img src="@/media/set7/2.jpg" @click="showSet(set7)" class="h-96">
    <img src="@/media/set8/2.jpg" @click="showSet(set8)" class="h-96">
    <img src="@/media/set9/2.jpg" @click="showSet(set9)" class="h-96">
    <img src="@/media/set1/2.jpg" @click="showSet(set1)" class="h-96">
    <img src="@/media/set2/2.jpg" @click="showSet(set2)" class="h-96">
    <img src="@/media/set3/2.jpg" @click="showSet(set3)" class="h-96">
    <img src="@/media/set7/1.jpg" @click="showSet(set7)" class="h-96">
    <img src="@/media/set4/1.jpg" @click="showSet(set4)" class="h-96">
    <img src="@/media/set5/1.jpg" @click="showSet(set5)" class="h-96">
    <img src="@/media/set6/1.jpg" @click="showSet(set6)" class="h-96">
    <img src="@/media/set7/1.jpg" @click="showSet(set7)" class="h-96">
    <img src="@/media/set8/1.jpg" @click="showSet(set8)" class="h-96">
    <img src="@/media/set9/1.jpg" @click="showSet(set9)" class="h-96">
  </div>
<!-- <div v-for="items in setOfPhoto">
  <img :src="items"
  class="h-96"
  >
</div> -->
</template>
<style scoped>

/* Default: All images are colored */
.image-container img {
  filter: grayscale(0%);
  transition: filter 0.3s ease; /* Smooth transition */
}

/* When hovering over the container, make all images grayscale */
.image-container:hover img {
  filter: grayscale(100%);
}

/* Keep the hovered image colored */
.image-container img:hover {
  filter: grayscale(0%);
}
</style>