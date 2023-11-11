<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      class="mb-4"
      type="email"
      :label="'email'"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-4"
      type="password"
      :label="'contraseña'"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
      @keyup.enter="onsubmit"
    />

    <div class="auth-layout__options flex items-center justify-between">
      <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">
        Olvidé mi contraseña
      </router-link>
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ ('Ingresar') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { isEmail } from '../../../services/utils';
  import { Store } from 'pinia';
  import { useAuthStore } from '../../../stores/auth-store'
  const { t } = useI18n()

  const email = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const store = useAuthStore();

  const formReady = computed(() => !emailErrors.value.length && !passwordErrors.value.length)

  function validateEmail(email:string){

    const errorList = [];

    if (!email) {
      errorList.push('El email es requerido');
    }


    if (email && !isEmail(email) ) {
      errorList.push('El email ingresado no tiene el formato correcto');
    }

    return errorList
  }

  function validatePassword(password:string){
    const errorList = [];

    if (!password) {
      errorList.push('El password es requerido');
    }
    
    return errorList
  }

  function login(email:string, password:string) {
    store.login(email,password,onLoginSuccess);
  }


  function onsubmit() {
    if (!formReady.value) return

    emailErrors.value = validateEmail(email.value);
    passwordErrors.value = validatePassword(password.value);


    login(email.value, password.value);
  }

  function onLoginSuccess(){
    router.push ("/admin/dashboard")
  }
</script>


