<template>
    <div>
      <form @submit.prevent="siguientePaso">
        <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="formData.sueldo" label="Sueldo" mask="numeral" />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.tipoDocumento"
                    :options="ocupacionesComercio"
                    label="Tipo de documento"
                    text-by="text"
                    track-by="value"
                />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="formData.fechaIngreso"
                    label="Fecha de ingreso"
                />            
            </div>
            
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.apellido" 
                    label="Apellido" 
                />
            </div>
            
        </div>
      </form>
    </div>
</template>
  
<script setup lang="ts">
    import { reactive, toRefs, defineProps, watch } from 'vue';
    import { DatosPersonalesFormType, Nacionalidad, Localidad, ocupacionesComercio, DatosProfesionalesFormType } from '../../../types';



    const propsis = defineProps<{
        formData: DatosProfesionalesFormType;
    }>()

    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosProfesionalesFormType}>(propsis);
    const localFormData = reactive({ ...props.formData.value });

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    function siguientePaso() {

    }

    function updateLocalidad (newLocalidad:Localidad) {
        props.formData.value.localidad = newLocalidad;
    }

    function updateNacionalidad (newNacionalidad:Nacionalidad) {
        props.formData.value.nacionalidad = newNacionalidad;
    }


    function puedeCompletarDatos() {
        return props.formData.value.tipoDocumento && props.formData.value.nroDocumento
    }

</script>