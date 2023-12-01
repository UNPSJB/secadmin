<template>
    <va-content class="typography content">
      <va-card class="markup-tables mb-8">
        <va-card-content class="overflow-auto">
          <div class="flex flex-row">
            <div class="basis-10/12">
              <h4>{{ esEdicion ? 'Editar profesor' : 'Nueva profesor' }}</h4>
            </div>
          </div>
          <form>
            <div class="grid grid-cols-12 gap-6">
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="nombre" label="Nombre" />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="apellido" label="Apellido"  />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="dni" label="DNI" />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="email" label="Email" />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="especialidad" label="Especialidad" />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="descripcion" label="Descripción" />
              </div>
              <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="honorarios" label="Honorarios" />
              </div>
            </div>
          </form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
              <va-button preset="outline" border-color="primary" @click="onCancelar"> Cancelar </va-button>
            </div>
            <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
              <va-button preset="outline" border-color="primary" @click="onLimpiar"> Limpiar </va-button>
            </div>
            <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
              <va-button :disabled="!sePuedeGuardar" @click="onGuardar"> Guardar </va-button>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </va-content>
  </template>

<script setup lang="ts">
import { ref, computed, watch, Ref, ComputedRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProfesorStore } from '../../../stores/profesores-store'
import { useToast } from 'vuestic-ui'
import { Profesor } from '../../../types'


const router = useRouter()
const route = useRoute()
const profesorStore = useProfesorStore()
const { init } = useToast()

const nombre = ref('')
const apellido = ref('')
const dni = ref('')
const email = ref('')
const descripcion = ref('')
const especialidad = ref('')
const honorarios = ref()

const esEdicion = route.name === 'editar-profesor'

if (esEdicion) {
  profesorStore.obtenerProfesor(route.params.id as string)
}


function onCancelar() {
  router.push({ name: 'aulas' })
}

const sePuedeGuardar = computed(
  () => dni.value !== '' && honorarios.value > 1 && especialidad.value !== '' && descripcion.value !== '',
)

function onLimpiar() {
nombre.value
apellido.value
dni.value
email.value
descripcion.value
especialidad.value
honorarios.value = null
}

async function onGuardar() {
  try {
    if (esEdicion) {
      await profesorStore.actualizarProfesor(
        route.params.id as string,
        nombre.value,
        apellido.value,
        dni.value,
        email.value,
        descripcion.value,
        especialidad.value,
        honorarios.value,
      )
    } else {
      await profesorStore.guardarProfesor(
        route.params.id as string,
        nombre.value,
        apellido.value,
        dni.value,
        email.value,
        descripcion.value,
        especialidad.value,
        honorarios.value)
    }
    init({
      message: 'Profesor guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'Profesor' })
  } catch (e: any) {
    init({
      message: e.message,
      position: 'bottom-right',
      duration: 2500,
      color: 'danger',
    })
  }
}

const profesorParaEditar: ComputedRef<Profesor | null> = computed(() => profesorStore.profesor)

watch(profesorParaEditar as any, (profesorAEditar: Profesor) => {
  if (profesorAEditar) {
    nombre.value = profesorAEditar.persona.nombre
    apellido.value = profesorAEditar.persona.apellido
    dni.value = profesorAEditar.persona.nroDocumento
    email.value = profesorAEditar.persona.email
    descripcion.value = profesorAEditar.descripcion
    especialidad.value = profesorAEditar.especialidad
    honorarios.value = profesorAEditar.honorarios
  }
})
</script>