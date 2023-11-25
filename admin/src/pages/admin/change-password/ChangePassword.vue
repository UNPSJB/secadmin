<template>
    <form @submit.prevent="onGuardar">
      <va-input
        v-model="contraseñaActual"
        class="mb-4"
        type="Contraseña actual"
        :label="'contraseña actual'"
        :error="!!passwordErrors && !!passwordErrors.length"
        :error-messages="passwordErrors"
      />
  
      <va-input
        v-model="nuevaContraseña"
        class="mb-4"
        type="nueva contraseña"
        :label="'nueva contraseña'"
        :error="!!passwordErrors && !!passwordErrors.length"
        :error-messages="passwordErrors"
      />

      <va-input
        v-model="confirmarContraseña"
        class="mb-4"
        type="confirmar contraseña"
        :label="'confirmar contraseña'"
        :error="!!passwordErrors && !!passwordErrors.length"
        :error-messages="passwordErrors"
        @keyup.enter="onGuardar"
      />

      <div class="flex justify-center mt-4">
        <va-button class="my-0" @click="onGuardar">Guardar</va-button>
      </div>
    </form>
  </template>


<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vuestic-ui'
  import { useChangePasswordStore } from '../../../stores/changePassword-store'

  const contraseñaActual = ref('')
  const nuevaContraseña = ref('')
  const confirmarContraseña = ref ('')
  const passwordErrors = ref<string[]>([])
  const router = useRouter()
  const formReady = computed(() => !passwordErrors.value.length)
  const store = useChangePasswordStore()
  const { init } = useToast()


function changePassword(contraseñaActual:string, nuevaContraseña:string, confirmarContraseña:string, onCambioCorrecto:(mensaje:string, exitoso:boolean)=>void){
    store.changePassword(contraseñaActual, nuevaContraseña,confirmarContraseña, onCambioCorrecto)
}

function onGuardar(){
    if(!formReady.value) return
  
    passwordErrors.value = validatePassword(contraseñaActual.value)
    changePassword(contraseñaActual.value, nuevaContraseña.value, confirmarContraseña.value, onCambioCorrecto)
}

function validatePassword(contraseñaActual:string) {
    const errorList = []

    if (!contraseñaActual) {
      errorList.push('La contraseeña actual es requerida')
    }

    return errorList
}

function onCambioCorrecto(mensaje: string, exitoso: boolean){
  if(exitoso){
    init({
        message: mensaje,
        position: 'bottom-right',
        duration: 2500,
      })
    router.push('/admin/dashboard')
  }else{
    init({
        message: mensaje,
        position: 'bottom-right',
        duration: 2500,
        color: 'danger',
    })
  }
}

</script>