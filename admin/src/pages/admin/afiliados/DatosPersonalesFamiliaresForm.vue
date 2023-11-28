<template>
    <div>
     
      <h5 v-if="tipoCarga === 'CONYUGE'"> Datos de cónyuge </h5>
      <h5 v-else> Datos de hijo </h5>

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
                <va-input 
                    v-model="formData.nroDocumento" 
                    label="Nro de documento" 
                    mask="numeral" 
                    @keyup:enter="buscarDocumento"
                >
                    <template #appendInner>
                        <va-button
                            icon="search"
                            preset="plain"
                            @click="buscarDocumento"
                            :disabled="esDocumentoIncompleto(formData.nroDocumento)"
                        />
                    </template>
                </va-input>
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.nombre" 
                    label="Nombre"
                    :disabled="!sePuedeEditar"
                />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.apellido" 
                    label="Apellido" 
                    :disabled="!sePuedeEditar"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.email" 
                    label="Email"
                    :disabled="!sePuedeEditar"
                    :rules="[(v) => esEmail(v) || `Ingresa un email válido`]"
                />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.telefono" 
                    label="Telefono"
                    :disabled="!sePuedeEditar"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="formData.fechaNacimiento"
                    label="Fecha nacimiento"
                    :disabled="!sePuedeEditar"
                />            
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.estadoCivil"
                    :options="listadoEstadosCiviles"
                    label="Estado Civil"
                    text-by="text"
                    track-by="value"
                    :disabled="!sePuedeEditar"
                />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <Suspense>
                    <LocalidadesSelect 
                        @update-localidad="updateLocalidad"
                        :localidad="formData.localidad"                    
                        :disabled="!sePuedeEditar"
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
                        :disabled="!sePuedeEditar"
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
                    :disabled="!sePuedeEditar"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.cuil" 
                    label="CUIL" 
                    :disabled="!sePuedeEditar"
                    mask="numeral" 
                />
            </div>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-3 sm:col-span-3 col-span-3">
            </div>
            <div class="flex md:col-span-2 sm:col-span-2 col-span-2">
                <va-button @click="onCancelar" preset="outline" border-color="primary"> Cancelar </va-button>
            </div>
            <div class="flex md:col-span-2 sm:col-span-2 col-span-2">
            </div>
            <div class="flex md:col-span-2 sm:col-span-2 col-span-2">
                <va-button 
                    @click="onGuardar"
                > Guardar </va-button>
            </div>
        
        </div>
      </form>
    </div>
    <va-modal
        v-model="mostrarModalDePersonaEncontrada"
        ok-text="Cargar automaticamente"
        cancel-text="Cargar manualmente"
        @ok="onCargarAutomaticamente"
        @cancel="onCargarManualmente"
    >
        <h3 class="va-h3">
            Persona encontrada en el sistema
        </h3>
        <p>
            Se ha encontrado una persona con el documento ingresado. ¿Quieres cargarlo automaticamente o quieres cargarlo manualmente de nuevo? Esta acción modificará los datos ya cargados en el sistema.
        </p>
    </va-modal>
</template>
  
<script setup lang="ts">
    import { ref, reactive, toRefs, defineProps, watch, computed } from 'vue';
    import { DatosPersonalesFormType, listaDocumentos, SelectOption, listadoEstadosCiviles } from '../../../types';
    import NacionalidadesSelect from '../../../components/selectors/NacionalidadesSelect.vue';
    import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';
    import { usePersonasStore } from '../../../stores/personas-store';
    import { esEmail, esDocumentoIncompleto } from '../../../services/utils/validaciones'

    const sePuedeEditar = ref(false);
    const mostrarModalDePersonaEncontrada = ref(false);

    const propsis = defineProps<{
        formData: DatosPersonalesFormType;
        tipoCarga?: 'CONYUGE' | "HIJO" | null
    }>()

    const personasStore = usePersonasStore();
    const emit = defineEmits(['cancelarForm', "guardarForm"]);

    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosPersonalesFormType}>(propsis);
    const localFormData = reactive({ ...props.formData.value });

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    function siguientePaso() {

    }

    function updateLocalidad (newLocalidad:SelectOption) {
        props.formData.value.localidad = newLocalidad;
    }

    function updateNacionalidad (newNacionalidad:SelectOption) {
        props.formData.value.nacionalidad = newNacionalidad;
    }


    function puedeCompletarDatos() {
        return sePuedeEditar
    }

    function buscarDocumento() {
        const {tipoDocumento, nroDocumento } = props.formData.value;
        if(!esDocumentoIncompleto(nroDocumento)) {
            personasStore.obtenerPersonaPorDocumento(tipoDocumento.value, nroDocumento, onPersonaEncontrada)
        }

    }

    function onPersonaEncontrada(persona:any){ 
        if (persona) {
            mostrarModalDePersonaEncontrada.value = true;
        } else {
            sePuedeEditar.value = true;
        }
    }

    function onCargarManualmente(){
        sePuedeEditar.value = true;
    }

    function onCargarAutomaticamente(){
        sePuedeEditar.value = true;
    }

    function onGuardar() {
        emit('guardarForm', props.formData.value);
    }

    function onCancelar() {
        emit('cancelarForm');
    }

</script>