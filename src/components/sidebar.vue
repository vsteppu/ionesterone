<script setup>
import { useAuthStore } from '@/stores/authStore.js';
const userStore = useAuthStore();

</script>

<template>
    <div>
        <router-link to="/" class="w-32 md:hidden flex items-center justify-center">
            <img src="@/media/Logo001.png" alt="Logo" class="h-12 mx-5 my-2">
        </router-link>
        <div class="md:hidden flex justify-center items-center bg-gray-500 h-16 w-40 ">
            <p class="h-[1px] w-7 bg-black m-4"></p>
            <p class="h-[1px] w-7 bg-black m-4"></p>
        </div>
        <div class="md:hidden">
            <router-link to="/" >Home</router-link>
            <router-link to="/Saved">Saved</router-link>
            <router-link to="/Mobileapp">Mobile</router-link>
            <router-link v-if="!userStore.isAuthenticated()" to="/Login">Log in</router-link>
            <router-link v-if="!userStore.isAuthenticated()" to="/Register">Register</router-link>
            <router-link v-if="userStore.isAuthenticated()" to="/MySpace">MySpace</router-link>
        </div>
    </div>
    <router-view></router-view>
    <!--   <div class="absolute top-0 flex w-full items-center px-32 justify-between shadow-md z-10 flex-col md:flex-row">
    <div class=" content-between mx-auto md:ml-5 text-md font-sl uppercase flex">
      <router-link to="/" class="w-32 flex items-center justify-center">
        <img src="@/media/Logo001.png" alt="Logo" class="h-12 mx-5 my-2">
      </router-link>
      <router-link to="/" class="nav-item sm:inline hidden">Home</router-link>
      <router-link to="/Saved" class="nav-item sm:inline hidden">Saved</router-link>
      <router-link to="/Mobileapp" class="nav-item sm:inline hidden">Mobile</router-link>
      <router-link v-if="!userStore.isAuthenticated()" to="/Login" class="nav-item sm:inline hidden">Log in</router-link>
      <router-link v-if="!userStore.isAuthenticated()" to="/Register" class="nav-item sm:inline hidden">Register</router-link>
      <router-link v-if="userStore.isAuthenticated()" to="/MySpace" class="nav-item sm:inline hidden">My Space</router-link>
      <div class="active bottom-0"></div>
      <router-link to="/Mobileapp" class="nav-item">MobileApp</router-link>
    </div>
    <div>
      <a href=""><img src="@/media/Insta.png" alt="Instagram link" class="opacity-50 h-8 mx-5 my-2 sm:inline hidden"></a>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
 -->
</template>
