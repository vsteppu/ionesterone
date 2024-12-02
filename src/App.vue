<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';

const router = useRouter()

const show = ref(true)

const currentLocation = computed(()=> router.currentRoute.value.path)

watch (
  currentLocation,
  ()=> { 
    console.log(currentLocation.value)
    if(currentLocation.value == '/'){ 
      show.value = true 
    }else{
      show.value = false 
    }
  }
  )

</script>

<template>
  <div class="absolute top-0 flex w-full items-center px-32 justify-between shadow-md z-10">
    <div 
    :class=" show ? 'text-white' : 'text-black'"
    class="content-between mx-auto md:ml-5 text-md font-sl uppercase md:flex sm:inline hidden">
      <router-link to="/" class="w-32 flex items-center justify-center">
        <img 
        src="@/media/Logo001.png" 
        alt="Logo" 
        :class=" show ? 'invert' : ''"
        class="h-12 mx-5 my-2">
      </router-link>
      <router-link 
        to="/" 
        class="nav-item "
      >
        Home
      </router-link>
      <router-link 
        to="/gallery" 
        class="nav-item sm:inline hidden"
      >
        Gallery
      </router-link>
      <router-link 
        to="/about" 
        class="nav-item sm:inline hidden"
      >
        About
      </router-link>
      <router-link 
        to="/Contacts" 
        class="nav-item sm:inline hidden"
      >
        Contacts
      </router-link>
      <div 
        :class=" show ? 'bg-white' : 'bg-black'"
        class="active bottom-0"
      >
      </div>
      <!--<router-link to="/Mobileapp" class="nav-item">MobileApp</router-link>-->
    </div>
    <div :class=" show ? 'invert' : ''">
      <a href="https://www.instagram.com/ionesterone/">
        <img 
        src="@/media/Insta.png" 
        alt="Instagram link"
        class="h-8 mx-5 my-2 sm:inline hidden"></a>
    </div>
  </div>
<!--   <Sidebar class="md:hidden"/> -->
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.nav-item {
  width: 8rem;
  text-align: center;
  padding-block: 20px;
}

.active {
  position: absolute;
  height: 1px;
  width: 8rem;
  transition: transform 0.2s;
}

.nav-item:nth-child(2):hover~.active {
  transform: translateX(8rem);
}

.nav-item:nth-child(3):hover~.active {
  transform: translateX(16rem);
}

.nav-item:nth-child(4):hover~.active {
  transform: translateX(24rem);
}

.nav-item:nth-child(5):hover~.active {
  transform: translateX(32rem);
}

.my-space:nth-child(5):hover~.active {
  transform: translateX(32rem);
}

.bg {
  background: linear-gradient(45deg, rgb(249, 210, 210), rgb(197, 247, 180), rgb(244, 172, 90), rgb(90, 103, 244));
  background-size: 300% 300%;
  animation: color ease-in-out 10s infinite
}

@keyframes color {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }

}

.sm {
  width: fit-content
}
</style>