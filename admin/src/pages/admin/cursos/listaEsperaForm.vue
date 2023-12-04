<template>
  <va-content class="typography content">
    <va-card class="markup-tables mb-8">
      <va-card-content class="overflow-auto">
        <div class="flex flex-row">
          <div class="basis-10/12">
            <h4>{{ esEdicion ? 'Editar listaEspera' : 'Nueva lista de espera' }}</h4>
          </div>
        </div>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <va-input v-model="nombre" label="nombre inscripto" />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <va-input v-model="apellido" label="apellido inscripto"/>
            </div>
          </
            <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <va-input v-model="DNI" label="DNI inscripto" />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <va-input v-model="fecha_creacion" label="Fecha inscripcion"/>
            </div>
          </div>
        </form>
        <div class="grid grid-cols-12 gap-6 mb-4">
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

  
      <va-card-content class="overflow-auto">
            <!-- <va-button @click="onVerListaEspera" v-if="esEdicion"> Ver Lista de Espera </va-button> -->
      </va-card-content>
    </va-card>
    <inscriptos v-if="esEdicion" :curso-id="Number(route.params.cursoId)"/>
  </va-content>
</template>


<script setup lang="ts">
import { ref, computed, watch, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useCursosStore } from '../../../stores/cursos-store';
import { useToast } from 'vuestic-ui'
import { Curso, Inscripto, SelectOption } from '../../../types';
import Dictados from './Dictados.vue';
import ListaEspera from './listaEspera.vue';
import Inscriptos from './Inscriptos.vue';
import { uselistaEsperaStore } from '../../../stores/listaEspera-store';

const router = useRouter()
const route = useRoute()
const listaDeEsperaStore = uselistaEsperaStore()
const { init } = useToast()

const nombre = ref('')
const apellido = ref('')
const DNI = ref('')
const fecha_creacion =ref <Date>(new Date());

const esEdicion = route.name === 'editar-listaEspera';

if (esEdicion) {
  listaDeEsperaStore.obtenerListaDeEspera(route.params.id as string)
}

function onCancelar() {
  router.push({ name: 'editar-curso', params: {id: route.params.cursoId } })
}

const sePuedeGuardar = computed(
  () => true
  )

function onLimpiar() {
}

async function onGuardar() {
  try {
    if (esEdicion) {
      await listaDeEsperaStore.actualizarlistaDeESpera(
        route.params.id as string,
        nombre.value,
        apellido.value,
        DNI.value,
        fecha_creacion.value,
      )
    } else {
      await listaDeEsperaStore.guardarlistaDeEspera(nombre.value, apellido.value, DNI.value, fecha_creacion.value)
    }
    init({
      message: 'lista guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'cursos' })
    } catch (e: any) {
      init({
        message: e.message,
        position: 'bottom-right',
        duration: 2500,
        color: 'danger',
      })
  }
}

const listaEsperaParaEditar: ComputedRef<listaEspera | null> = computed(() => listaDeEsperaStore.listaDeEspera)

watch(listaEsperaParaEditar as any, (listaDeEsperaAEditar: Curso) => {
  if (listaDeEsperaAEditar) {
    nombre.value = listaDeEsperaAEditar.codigo_curso
    apellido.value = listaDeEsperaAEditar.apellido
    DNI.value = listaDeEsperaAEditar.DNI
    fecha_creacion.value = listaDeEsperaAEditar.fecha_creacion
  }
})

</script>
