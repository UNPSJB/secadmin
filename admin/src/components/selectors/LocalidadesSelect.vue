<template>
  <va-select
    v-model="localidadSeleccionada"
    label="Localidad"
    searchable
    text-by="nombre"
    track-by="id"
    :options="localidades"
    :search="searchText"
    no-options-text="No se encontró coincidencia"
    search-placeholder-text="Buscar localidad"
    @updateSearch="onCambioBusqueda"
  />
</template>

<script setup lang="ts">
  import { computed, ref, defineEmits, watch, watchEffect } from 'vue'

  import { debounce } from 'lodash'
  import { useLocalidadesStore } from '../../stores/localidades-store'

  const localidadesStore = useLocalidadesStore()

  let searchText = ''

  const debouncedObtenerLocalidades = debounce(async (searchTextValue?: string) => {
    await localidadesStore.obtenerLocalidades(searchTextValue)
  }, 300) // 300 milisegundos de retardo

  const onCambioBusqueda = async (nuevoVal: any) => {
    if (nuevoVal !== '' && nuevoVal !== searchText) {
      await debouncedObtenerLocalidades(nuevoVal)
    } else {
      await debouncedObtenerLocalidades()
    }
  }

  const props = defineProps(['localidad'])

  const localidadSeleccionada = ref(props.localidad)

  await localidadesStore.obtenerLocalidades()

  const localidades = computed(() => localidadesStore.localidades)

  const emit = defineEmits(['update-localidad'])

  watch(
    () => props.localidad,
    (nuevaLocalidad) => {
      localidadSeleccionada.value = nuevaLocalidad
    },
  )
  watchEffect(() => {
    localidadSeleccionada.value = props.localidad
  })

  watch(localidadSeleccionada, (newLocalidad) => {
    emit('update-localidad', newLocalidad)
  })
</script>
