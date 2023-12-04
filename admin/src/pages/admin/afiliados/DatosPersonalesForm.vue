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
                    value-by="value"
                />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.nroDocumento" 
                    label="Nro de documento" 
                    v-maska
                    data-maska="###.###.###"
                    data-maska-reversed
                    @keyup.enter="buscarDocumento"
                    :rules="[(v) => esDocumentoValido(v) || `Ingrese un documento válido`]"
                >
                    <template #appendInner>
                        <va-button
                            icon="search"
                            preset="plain"
                            @click="buscarDocumento"
                            :disabled="!esDocumentoValido(formData.nroDocumento)"
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
                    v-model="telefono" 
                    label="Telefono"
                    :disabled="!sePuedeEditar"
                    v-maska
                    data-maska="+54 (###) ###-####"
                    :rules="[(v)=> !v || esNumeroDeTelefonoCompleto(v) || 'Ingrese un número de teléfono válido']"
                />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="formData.fecha_nacimiento"
                    label="Fecha nacimiento"
                    :disabled="!sePuedeEditar"
                    :rules="[(v)=> !v || esMayorDeCiertaEdad(14, v) || 'La fecha de nacimiento ingresada no es válida']"
                    v-model:view="fechaDeNacimientoView"
                    :monthNames="['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']"
                    :weekdayNames="['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']"
                />            
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.estado_civil"
                    :options="listadoEstadosCiviles"
                    label="Estado Civil"
                    text-by="text"
                    value-by="value"
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
                    v-model="formData.direccion" 
                    label="Domicilio"
                    :disabled="!sePuedeEditar"
                />
            </div>
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="formData.cuil" 
                    label="CUIL" 
                    :disabled="!sePuedeEditar"
                    v-maska
                    data-maska="##-########-#"
                    :rules="[(v)=> !v || esCUILValido(v) || 'El CUIL ingresado no es válido']"

                />
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
    import { ref, reactive, toRefs, defineProps, watch, computed, onMounted } from 'vue';
    import { DatosPersonalesFormType, listaDocumentos, SelectOption, listadoEstadosCiviles } from '../../../types';
    import NacionalidadesSelect from '../../../components/selectors/NacionalidadesSelect.vue';
    import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';
    import { usePersonasStore } from '../../../stores/personas-store';
    import { esEmail, esDocumentoValido, esNumeroDeTelefonoCompleto, esMayorDeCiertaEdad, esCUILValido } from '../../../services/utils/validaciones'
    import { vMaska } from 'maska'
    import { DatePickerView } from 'vuestic-ui/dist/types/components/va-date-picker/types';

    const sePuedeEditar = ref(false);
    const mostrarModalDePersonaEncontrada = ref(false);

    const telefono = ref("");
    const fechaDeNacimientoView = ref<DatePickerView>({type: "year", year: 2000, month:1})    

    const propsis = defineProps<{
        formData: DatosPersonalesFormType;
    }>()

    const personasStore = usePersonasStore();

    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosPersonalesFormType}>(propsis);
    const localFormData = reactive({ ...props.formData.value });

    const personaEncontrada = ref<any>(null)

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    watch(telefono, (newValue) => {
        props.formData.value.telefono = newValue;
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
        if(esDocumentoValido(nroDocumento)) {
            personasStore.obtenerPersonaPorDocumento(tipoDocumento, nroDocumento, onPersonaEncontrada)
        }

    }

    function onPersonaEncontrada(persona:any){ 
        if (persona) {
            personaEncontrada.value = persona;
            mostrarModalDePersonaEncontrada.value = true;
        } else {
            sePuedeEditar.value = true;
        }
    }

    function onCargarManualmente(){
        sePuedeEditar.value = true;
    }

    function onCargarAutomaticamente(){
        debugger       
        sePuedeEditar.value = true;
        const data = personaEncontrada.value;
        props.formData.value.nombre = data.nombre; 
        props.formData.value.apellido = data.apellido;
        props.formData.value.telefono = data.telefono;
        props.formData.value.direccion = data.direccion;
        props.formData.value.cuil = data.cuil;
        props.formData.value.email = data.usuario.email;
        props.formData.value.fecha_nacimiento = new Date(data.fecha_nacimiento);
        props.formData.value.estado_civil = data.estado_civil;
    }
</script>