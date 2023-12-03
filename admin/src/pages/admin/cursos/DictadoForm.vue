<template>
  <va-content class="typography content">
    <va-card class="markup-tables mb-8">
      <va-card-content class="overflow-auto">
        <div class="flex flex-row">
          <div class="basis-10/12">
            <h4>{{ esEdicion ? 'Editar Dictado' : 'Nuevo Dictado' }}</h4>
          </div>
        </div>
        <form>
          <div class="grid grid-cols-12 gap-6">
            
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
    <dictados />
  </va-content>
</template>

<script setup lang="ts">
import { ref, computed, watch, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useCursosStore } from '../../../stores/cursos-store';
import { useToast } from 'vuestic-ui'
import { Curso, CategoriaCurso, TipoCurso, duracionCurso, areaCurso, SelectOption } from '../../../types';
import Dictados from './Dictados.vue';

const router = useRouter()
const route = useRoute()
const cursosStore = useCursosStore()
const { init } = useToast()

const codigoCurso = ref('')
const nombreCurso = ref('')
const categoriaCurso = ref<CategoriaCurso>()
const tipoCurso = ref<TipoCurso>()

const esEdicion = route.name === 'editar-curso';

if (esEdicion) {
  cursosStore.obtenerCurso(route.params.id as string)
}

function onCancelar() {
  router.push({ name: 'cursos' })
}

const sePuedeGuardar = computed(
  () => codigoCurso.value !== '' && nombreCurso.value !== '' && categoriaCurso.value !== null && tipoCurso.value !== null,
)

function onLimpiar() {
  codigoCurso.value = '';
  nombreCurso.value = '';
  categoriaCurso.value = undefined;
  tipoCurso.value = undefined;
}

async function onGuardar() {
  try {
    if (esEdicion) {
      await cursosStore.actualizarCurso(
        route.params.id as string,
        codigoCurso.value,
        nombreCurso.value,
        categoriaCurso.value,
        tipoCurso.value,
      )
    } else {
      await cursosStore.guardarCurso(codigoCurso.value, nombreCurso.value, categoriaCurso.value, tipoCurso.value)
    }
    init({
      message: 'Curso guardado correctamente',
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

const cursoParaEditar: ComputedRef<Curso | null> = computed(() => cursosStore.curso)

watch(cursoParaEditar as any, (cursoAEditar: Curso) => {
  if (cursoAEditar) {
    codigoCurso.value = cursoAEditar.codigo_curso
    nombreCurso.value = cursoAEditar.nombre_curso
    categoriaCurso.value = cursoAEditar.categoria_curso
    tipoCurso.value = cursoAEditar.tipo_curso
  }
})
</script>
