<template>
    <va-content class="typography content">
      <va-card class="markup-tables mb-8">
        <va-card-content class="overflow-auto">
          <div class="flex flex-row">
            <div class="basis-10/12">
              <h4>{{ esEdicion ? 'Editar alumno' : 'Nuevo alumno' }}</h4>
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
import { useAlumnoStore } from '../../../stores/alumnos-store'
import { useToast } from 'vuestic-ui'
import { Alumno } from '../../../types'


const router = useRouter()
const route = useRoute()
const alumnoStore = useAlumnoStore()
const { init } = useToast()

const nombre = ref('')
const apellido = ref('')
const dni = ref('')
const email = ref('')
const descripcion = ref('')
const especialidad = ref('')
const honorarios = ref()

const esEdicion = route.name === 'editar-alumno'

if (esEdicion) {
    alumnoStore.obtenerAlumno(route.params.id as string)
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
      await alumnoStore.actualizarAlumno(
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
      await alumnoStore.guardarAlumno(
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
      message: 'Alumno guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'Alumno' })
  } catch (e: any) {
    init({
      message: e.message,
      position: 'bottom-right',
      duration: 2500,
      color: 'danger',
    })
  }
}

const alumnoParaEditar: ComputedRef<Alumno | null> = computed(() => alumnoStore.alumno)

watch(alumnoParaEditar as any, (alumnoAEditar: Alumno) => {
  if (alumnoAEditar) {
    nombre.value = alumnoAEditar.persona.nombre
    apellido.value = alumnoAEditar.persona.apellido
    dni.value = alumnoAEditar.persona.nroDocumento
    email.value = alumnoAEditar.persona.email
    descripcion.value = alumnoAEditar.descripcion
    especialidad.value = alumnoAEditar.especialidad
    honorarios.value = alumnoAEditar.honorarios
  }
})

</script>