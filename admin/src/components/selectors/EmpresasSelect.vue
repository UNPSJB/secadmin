<template>
    <va-select 
        v-model="empresaSeleccionada" 
        label="Empresa" 
        searchable 
        :text-by="getTextBy" 
        track-by="id"
        :options="empresas" 
        :search="searchText"
        noOptionsText="No se encontró coincidencia"
        searchPlaceholderText="Buscar empresa" 
        @updateSearch="onCambioBusqueda"
        :disabled="disabled"
    />
</template>

<script setup lang="ts">
import { computed, ref, defineEmits, watch, watchEffect } from 'vue'

import { debounce } from 'lodash';
import { useEmpresasStore } from '../../stores/empresas-store';
import { Empresa } from '../../types';

  const empresasStore = useEmpresasStore()

  let searchText = ''

  const debouncedObtenerEmpresas = debounce(async (searchTextValue?: string) => {
    await empresasStore.obtenerListadoDeEmpresas(searchTextValue)
  }, 300) // 300 milisegundos de retardo

  const onCambioBusqueda = async (nuevoVal: any) => {
    if (nuevoVal !== '' && nuevoVal !== searchText) {
      await debouncedObtenerEmpresas(nuevoVal)
    } else {
      await debouncedObtenerEmpresas()
    }
  }

    function getTextBy(opcion:Empresa) {
        return `${opcion.razon_social}`
    }

    const props = defineProps(['empresa', 'disabled']);

  const empresaSeleccionada = ref(props.empresa)

  await empresasStore.obtenerListadoDeEmpresas()

  const empresas = computed(() => empresasStore.empresas)

  const emit = defineEmits(['update-empresa'])

  watch(
    () => props.empresa,
    (nuevaEmpresa) => {
      empresaSeleccionada.value = nuevaEmpresa
    },
  )
  watchEffect(() => {
    empresaSeleccionada.value = props.empresa
  })

  watch(empresaSeleccionada, (newEmpresa) => {
    emit('update-empresa', newEmpresa)
  })
</script>
