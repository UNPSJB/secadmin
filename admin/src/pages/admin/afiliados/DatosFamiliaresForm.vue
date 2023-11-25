<template>
    <div>
      <form @submit.prevent="siguientePaso">
        <div class="grid grid-cols-12 gap-6">
            <div class="flex flex-row">
                <div class="basis-10/12">
                    <h5> Datos de conyuge </h5>
                </div>
            </div>
            <div class="basis-2/12">
                <va-button @click="onNuevoConyuge"> Cargar conyuge </va-button>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="flex flex-row">
                <div class="basis-10/12">
                    <h5> Datos de hijos </h5>
                </div>
            </div>
            <div class="basis-2/12">
                <va-button @click="onNuevoHijo"> Cargar hijo </va-button>
            </div>
        </div>
      </form>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, reactive, toRefs, onMounted, defineProps, watch } from 'vue';
    import { DatosPersonalesFormType, listaDocumentos, Nacionalidad, Localidad, ocupacionesComercio } from '../../../types';
    import NacionalidadesSelect from '../../../components/selectors/NacionalidadesSelect.vue';
    import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';


    const propsis = defineProps<{
        formData: DatosPersonalesFormType;
    }>()

    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosPersonalesFormType}>(propsis);
    const localFormData = reactive({ ...props.formData.value });

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    function siguientePaso() {

    }

    function onNuevoConyuge (newLocalidad:Localidad) {
        props.formData.value.localidad = newLocalidad;
    }

    function onNuevoHijo (newLocalidad:Localidad) {
        props.formData.value.localidad = newLocalidad;
    }

</script>