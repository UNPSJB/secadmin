<template>
    <div>
      <form @submit.prevent="siguientePaso">
        <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.tipoDocumento"
                    :options="listaDocumentos"
                    label="Tipo de documento"
                    text-by="text"
                    track-by="value"
                />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="formData.nroDocumento" label="Nro de documento" mask="numeral" />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.nombre" 
                    label="Nombre"
                    :disabled="!puedeCompletarDatos()"
                />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.apellido" 
                    label="Apellido" 
                    :disabled="!puedeCompletarDatos()"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.email" 
                    label="Email"
                    :disabled="!puedeCompletarDatos()"
                />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.telefono" 
                    label="Telefono"
                    :disabled="!puedeCompletarDatos()"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="formData.fechaNacimiento"
                    label="Fecha nacimiento"
                    :disabled="!puedeCompletarDatos()"
                />            
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.estadoCivil"
                    :options="listadoEstadosCiviles"
                    label="Estado Civil"
                    text-by="text"
                    track-by="value"
                    :disabled="!puedeCompletarDatos()"
                />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <Suspense>
                    <LocalidadesSelect 
                        @update-localidad="updateLocalidad"
                        :localidad="formData.localidad"                    
                        :disabled="!puedeCompletarDatos()"
                    />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <Suspense>
                    <NacionalidadesSelect 
                        @update-nacionalidad="updateNacionalidad"
                        :nacionalidad="formData.nacionalidad"
                        :disabled="!puedeCompletarDatos()"
                    />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.domicilio" 
                    label="Domicilio"
                    :disabled="!puedeCompletarDatos()"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.cuil" 
                    label="CUIL" 
                    :disabled="!puedeCompletarDatos()"
                    mask="numeral" 
                />
            </div>
        </div>
      </form>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, reactive, toRefs, onMounted, defineProps, watch } from 'vue';
    import { DatosPersonalesFormType, listaDocumentos, Nacionalidad, Localidad, listadoEstadosCiviles } from '../../../types';
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