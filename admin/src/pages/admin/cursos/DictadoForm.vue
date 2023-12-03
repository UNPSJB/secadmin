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
import { useDictadosStore } from '../../../stores/dictados-store';
import { useToast } from 'vuestic-ui'
import { Dictado, CategoriaDictado, TipoDictado, duracionDictado, areaDictado, SelectOption } from '../../../types';
import Dictados from './Dictados.vue';

const router = useRouter()
const route = useRoute()
const dictadosStore = useDictadosStore()
const { init } = useToast()

const codigoDictado = ref('')
const nombreDictado = ref('')
const categoriaDictado = ref<CategoriaDictado>()
const tipoDictado = ref<TipoDictado>()

const esEdicion = route.name === 'editar-dictado';

if (esEdicion) {
  dictadosStore.obtenerDictado(route.params.id as string)
}

function onCancelar() {
  router.push({ name: 'dictados' })
}

const sePuedeGuardar = computed(
  () => codigoDictado.value !== '' && nombreDictado.value !== '' && categoriaDictado.value !== null && tipoDictado.value !== null,
)

function onLimpiar() {
  codigoDictado.value = '';
  nombreDictado.value = '';
  categoriaDictado.value = undefined;
  tipoDictado.value = undefined;
}

async function onGuardar() {
  try {
    if (esEdicion) {
      await dictadosStore.actualizarDictado(
        route.params.id as string,
        codigoDictado.value,
        nombreDictado.value,
        categoriaDictado.value,
        tipoDictado.value,
      )
    } else {
      await dictadosStore.guardarDictado(codigoDictado.value, nombreDictado.value, categoriaDictado.value, tipoDictado.value)
    }
    init({
      message: 'Dictado guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'dictados' })
    } catch (e: any) {
      init({
        message: e.message,
        position: 'bottom-right',
        duration: 2500,
        color: 'danger',
      })
  }
}

const dictadoParaEditar: ComputedRef<Dictado | null> = computed(() => dictadosStore.dictado)

watch(dictadoParaEditar as any, (dictadoAEditar: Dictado) => {
  if (dictadoAEditar) {
    codigoDictado.value = dictadoAEditar.codigo_dictado
    nombreDictado.value = dictadoAEditar.nombre_dictado
    categoriaDictado.value = dictadoAEditar.categoria_dictado
    tipoDictado.value = dictadoAEditar.tipo_dictado
  }
})
</script>
