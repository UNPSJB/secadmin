<template>
    <va-select 
        v-model="profesorSeleccionada" 
        label="Profesor" 
        searchable 
        :text-by="getTextBy" 
        track-by="id"
        :options="profesores" 
        :search="searchText"
        noOptionsText="No se encontró coincidencia"
        searchPlaceholderText="Buscar profesor" 
        @updateSearch="onCambioBusqueda"
        :disabled="disabled"
    />
</template>

<script setup lang="ts">
import { computed, ref, defineEmits, watch, watchEffect } from 'vue'

import { debounce } from 'lodash';
import { useProfesorStore } from '../../stores/profesores-store';
import { Profesor } from '../../types';

  const profesorStore = useProfesorStore()

  let searchText = ''

  const debouncedObtenerProfesors = debounce(async (searchTextValue?: string) => {
    await profesorStore.obtenerListadoDeProfesores(searchTextValue)
  }, 300) // 300 milisegundos de retardo

  const onCambioBusqueda = async (nuevoVal: any) => {
    if (nuevoVal !== '' && nuevoVal !== searchText) {
      await debouncedObtenerProfesors(nuevoVal)
    } else {
      await debouncedObtenerProfesors()
    }
  }

    function getTextBy(opcion:Profesor) {
        return `${opcion.persona.nombre} ${opcion.persona.apellido}`
    }

    const props = defineProps(['profesor', 'disabled']);

  const profesorSeleccionada = ref(props.profesor)

  await profesorStore.obtenerListadoDeProfesores()

  const profesores = computed(() => profesorStore.profesores)

  const emit = defineEmits(['update-profesor'])

  watch(
    () => props.profesor,
    (nuevaProfesor) => {
      profesorSeleccionada.value = nuevaProfesor
    },
  )
  watchEffect(() => {
    profesorSeleccionada.value = props.profesor
  })

  watch(profesorSeleccionada, (newProfesor) => {
    emit('update-profesor', newProfesor)
  })
</script>
