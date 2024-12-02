<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { validateFormForEmail, validateFormForPassword } from '@/utilities/validationerrors.js'
import { errorCodes } from '@/utilities/autherrors'



const router = useRouter();
const authStore = useAuthStore();

const email = ref('shtepuvlad@gmail.com')
const password = ref('vstepuGmail.9999')
const confirmationPassword = ref('vstepuGmail.9999')
const errorMessage = ref('')
const isPasswordVisible = ref(false);

const register = async () => {
  try {
    validateFormForEmail(email.value);
    validateFormForPassword(password.value, confirmationPassword.value);
    const user = await authStore.registerUser(email.value, password.value);
    if (user) {
      router.push('/');
    }
  } catch (error) {
    errorMessage.value = errorCodes[error.code] ?? error.message;
  }
}

const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

</script>

<template>
  <div class="flex justify-center items-center relative top-20 inset-0">
    <form @submit.prevent="register"
      class="flex-col space-y-1 grid place-items-start py-8 px-20 rounded-lg bg-gray-100 shadow-xl">

      <h1 class="mx-auto mb-5 text-2xl">Register</h1>

      <input v-model="email" placeholder="Enter email" type="email"
        class=" w-full grid place-items-center border pl-3 py-1 rounded-xl bg-gray-200">

      <input v-model="password" placeholder="Enter password" :type="isPasswordVisible ? 'text' : 'password'"
        class=" w-full grid place-items-center border pl-3 py-1  rounded-xl bg-gray-200">
      <input v-model="confirmationPassword" placeholder="Enter password" :type="isPasswordVisible ? 'text' : 'password'"
        class=" w-full grid place-items-center border pl-3 py-1  rounded-xl bg-gray-200">
      <button @click="togglePasswordVisibiliti" type="button" class="py-3 ">
        {{ isPasswordVisible ? 'Hide Passwords' : 'Show Passwords' }}
      </button>
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <button @click="register"
        class=" place-items-center mx-auto my-3 bg-slate-200 rounded-xl w-80 h-14  hover:bg-slate-300 duration-500 shadow-md ">Submit</button>
    </form>
  </div>
</template>