<script setup>
import { useAuthStore } from '@/stores/authStore.js';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase/Firebase';
import { ref } from 'vue';

const router = useRouter()
const authStore = useAuthStore();

const currentPassword = ref('vstepuGmail.9999')
const newPassword = ref('vstepugmail.11111')
const confirmNewPassword = ref('vstepugmail.11111')
const error = ref('')
const errorMessage = ref('')
const isReauthenticate = ref(false)
const isActive = ref(false)
const isPasswordVisible = ref(false);
const isReauthenticatePasswordVisible = ref(false);

const reauthenticateuser = async () => {
  const succes = await authStore.reauthenticateUser(currentPassword.value);
  isReauthenticate.value = succes
  console.log('Value of isReauthenticate =' + isReauthenticate.value)
  return succes
};

const changepassword = async () => {
  if (newPassword.value === confirmNewPassword.value) {
    if (isReauthenticate.value) {
      const user = await authStore.changePassword(newPassword.value)
      if (user) {
        router.push('/')
      } else {
        console.log(authStore.errorMessage);
      }
    } else {
      error.value = 'Reautentificarea eșuată. Te rugăm să încerci din nou.';
    }
  }
}

const changePasswordButton = () => {
  isActive.value = !isActive.value
}

const logout = async () => {
  try {
    await auth.signOut();
    authStore.setUser(null);
    router.push('/')
  } catch (error) {
    errorMessage.value = error.message;
  }
}

const togglePasswordVisibiliti = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const toggleReauthenticatePasswordVisibiliti = () => {
  isReauthenticatePasswordVisible.value = !isReauthenticatePasswordVisible.value
}

</script>

<template>
  <div class="flex justify-center items-center relative top-20 inset-0  ">
    <div class="flex mx-auto w-4/5 py-8 px-20 rounded-lg bg-gray-100 shadow-xl">
      <img src="@/media/Logo001.png" alt="Image" class="bg-gray-200 h-28 rounded-lg mr-4">
      <div v-if="authStore.user" class="grid place-items-start" > My Space:
        {{ authStore.user.email }}

        <button @click="changePasswordButton"
          class=" bg-gray-200 px-2 my-1 rounded-xl hover:bg-[#ede8e3] hover:text-amber-900 ">Change password</button>
        <div v-if="isActive">
          <input v-model="currentPassword" :type="isReauthenticatePasswordVisible ? 'text' : 'password'"
            placeholder="Type current password" class=" w-80 border rounded-l-xl bg-gray-200 my-2 pl-3 py-1 h-9 ">
          <button @click="toggleReauthenticatePasswordVisibiliti" type="button"
            class=" place-items-center mx-auto my-3 bg-gray-200 rounded-r-xl px-2 h-9  hover:bg-gray-300 ">
            {{ isReauthenticatePasswordVisible ? 'Hide' : 'Show' }} </button>
          <br>
          <button @click="reauthenticateuser"
            class=" place-items-center mx-auto my-3 bg-gray-200 rounded-xl px-2 h-9  hover:bg-gray-300 ">ReauthenticateUser</button>
          <div v-if="isReauthenticate" class="flex flex-col place-items-start">
            <input v-model="newPassword" class=" w-80 border rounded-xl bg-gray-200 my-2 pl-3 py-1 h-9 "
              :type="isPasswordVisible ? 'text' : 'password'" placeholder="Type new password">
            <input v-model="confirmNewPassword" class=" w-80 border rounded-xl bg-gray-200 my-2 pl-3 py-1 h-9 "
              :type="isPasswordVisible ? 'text' : 'password'" placeholder="Confirm new password">
            <button @click="togglePasswordVisibiliti" class=" my-1 bg-gray-200 rounded-xl px-2 h-9  hover:bg-gray-300 "
              type="button">
              {{ isPasswordVisible ? 'Hide Password' : 'Show Password' }} </button>
            <button @click="changepassword"
              class="my-1 bg-gray-200 rounded-xl px-2 h-8  hover:bg-gray-300 ">ChangePassword</button>
          </div>
          {{ error }} {{ errorMessage }}
        </div>
        <button @click="logout" class=" bg-gray-200 p-2 my-1 rounded-xl hover:bg-[#ede8e3] hover:text-amber-900 ">Log
          out</button><br>
      </div>
    </div>
  </div>


</template>