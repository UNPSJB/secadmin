<template>
    <va-select 
        v-model="nacionalidadSeleccionada" 
        label="Nacionalidad" 
        searchable 
        text-by="nombre_es" 
        track-by="id"
        :options="nacionalidades" 
        :search="searchText"
        noOptionsText="No se encontró coincidencia"
        searchPlaceholderText="Buscar nacionalidad" 
        @updateSearch="onCambioBusqueda"
        :disabled="disabled"
    />
</template>
  
<script setup lang="ts">
    import { computed, ref, defineEmits, watch, watchEffect } from 'vue';

    import { debounce } from 'lodash';
    import { useNacionalidadesStore } from '../../stores/nacionalidades-store';

    const nacionalidadesStore = useNacionalidadesStore();

    let searchText = "";

    const debouncedObtenerNacionalidades = debounce(async (searchTextValue?: string) => {
        await nacionalidadesStore.obtenerNacionalidades(searchTextValue);
    }, 300);  // 300 milisegundos de retardo

    const onCambioBusqueda = async (nuevoVal:any) => {
        if(nuevoVal !== '' && nuevoVal !== searchText) {
            await debouncedObtenerNacionalidades(nuevoVal);
        } else {
            await debouncedObtenerNacionalidades();
        }
    }

    const props = defineProps(['nacionalidad', 'disabled']);

    const nacionalidadSeleccionada = ref(props.nacionalidad);

    await nacionalidadesStore.obtenerNacionalidades();

    const nacionalidades = computed(() => nacionalidadesStore.nacionalidades);

    const emit = defineEmits(['update-nacionalidad']);

    watch(() => props.nacionalidad, (nuevaNacionalidad) => {
        nacionalidadSeleccionada.value = nuevaNacionalidad;
    });
    watchEffect(() => {
        nacionalidadSeleccionada.value = props.nacionalidad;
    });

    watch(nacionalidadSeleccionada, (newNacionalidad,) => {
        emit('update-nacionalidad', newNacionalidad);
    })

</script>