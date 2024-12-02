<template>
  <div class="bg h-screen">
    <div class="flex justify-center items-center absolute inset-0 ">
      <form @submit.prevent="login" class=" grid place-items-start  py-8 px-20 rounded-lg bg-white bg-opacity-50 shadow-xl">
        
        <h2 class="mx-auto mb-5 text-2xl">Log in</h2>
        
        <button type="button" @click="loginWithGoogle()" class="mx-auto mb-5 text-lg flex items-center">
          <img src="../media/googleicon.png" alt="Hide" class="h-4 mr-1 ">
        Login with Google
      </button>

      <input v-model="email" type="email" placeholder="Email" 
      class=" w-80 border rounded-xl bg-gray-200 my-2 pl-3 py-1 h-9 " />

      <div class="flex w-80">
        <input :type="isPasswordVisible ? 'text' : 'password'" v-model="password" placeholder="Password"
          class=" w-full grid place-items-center border pl-3 rounded-l-xl bg-gray-200" />
        <button @click="togglePasswordVisibiliti" type="button" :class="isPasswordVisible ? 'hover:bg-green-200 duration-500' : 'hover:bg-red-200 duration-500'" class=" px-4 bg-gray-200 rounded-r-xl h-9 ">
          <div v-if="isPasswordVisible" ><img src="../media/Hide.png" alt="Hide" class="h-6 opacity-50"></div>
          <div v-else-if="!isPasswordVisible"><img  src="../media/Show.png" alt="Show" class="h-6 opacity-50"></div>
        </button>
      </div>
      
      <div class="flex-column">
        <router-link to="/forgotpasslink" class=" text-sm">Forgot Password</router-link><br>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
      <button type="submit" class=" place-items-center mx-auto my-3 bg-slate-200 rounded-xl w-80 h-14  hover:bg-slate-300 duration-500 shadow-md ">Login</button>
    </form>
  </div>
  <router-view></router-view>
</div>
</template>


<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore.js';
import { useRouter } from 'vue-router';
import { validateFormForEmail } from '@/utilities/validationerrors.js'
import { errorCodes } from '@/utilities/autherrors'


const router = useRouter()
const authStore = useAuthStore()

const email = ref('shtepuvlad@gmail.com');
const password = ref('vstepuGmail.9999');
const errorMessage = ref('');
const isPasswordVisible = ref(false);

const login = async () => {
  try {
    validateFormForEmail(email.value);
    const user = await authStore.authUser(email.value, password.value);
    if (user) { router.push('/'); }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
};

const loginWithGoogle = async () => {
  try{
    const checkInstagram = isInstagramBrowser()
    const redirectUrl = 'https://search-for-jobs.netlify.app';
    if (checkInstagram) {
      const ua = navigator.userAgent
      console.log(ua)
      if (/iPad|iPhone|iPod/.test(ua)) {
        window.location.href = redirectUrl;
      } else {
        alert(window.location.href);
        const chromeUrl = `googlechrome://${redirectUrl.replace(/^https?:\/\//, '')}`;
        //window.open('https://search-for-jobs.netlify.app', '_blank');
        //window.location.replace('https://search-for-jobs.netlify.app/')
        //window.location.href = window.location.protocol + '//' + window.location.host;
        window.location.href = chromeUrl;
      }
    } else {
      alert(window.location.href);
    }

    await authStore.loginWithGoogle();  // Call the store's Google login function
    router.push('/'); // Redirect after successful login
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
}


const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

</script>

<style scoped>
.bg {
  background: linear-gradient( 45deg, rgb(249, 210, 210), rgb(197, 247, 180), rgb(244, 172, 90),rgb(52, 7, 54));
  background-size: 300% 300%;
  animation: color ease-in-out 10s infinite
}
@keyframes color {
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }

}
</style>