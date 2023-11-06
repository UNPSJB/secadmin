<template>
    <va-select 
        v-model="localidad" 
        label="Localidad" 
        searchable 
        text-by="nombre" 
        track-by="id"
        :options="localidades" 
        :search="searchText"
        noOptionsText="No se encontró coincidencia"
        searchPlaceholderText="Buscar localidad" 
        @updateSearch="onCambioBusqueda"
    />
</template>
  
<script setup lang="ts">
    import { computed, ref, defineEmits, watch } from 'vue';

    import { debounce } from 'lodash';
    import { useLocalidadesStore } from '../../stores/localidades-store';

    const localidadesStore = useLocalidadesStore();

    let searchText = "";

    const debouncedObtenerLocalidades = debounce(async (searchTextValue?: string) => {
        await localidadesStore.obtenerLocalidades(searchTextValue);
    }, 300);  // 300 milisegundos de retardo

    const onCambioBusqueda = async (nuevoVal:any) => {
        if(nuevoVal !== '' && nuevoVal !== searchText) {
            await debouncedObtenerLocalidades(nuevoVal);
        } else {
            await debouncedObtenerLocalidades();
        }
    }

    const props = defineProps({
        localidad: Object,
    });

    let localidad: any = ref(props.localidad);


    await localidadesStore.obtenerLocalidades();

    const localidades = computed(() => localidadesStore.localidades);

    const emit = defineEmits(['update-localidad']);

    watch(localidad, (newLocalidad,) => {
        emit('update-localidad', newLocalidad);
    })



</script>