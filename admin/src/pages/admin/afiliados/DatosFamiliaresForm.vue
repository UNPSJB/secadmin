<template>
    <div v-if="!cargarPersona">
        <DatosFamiliaresTablas
            :conyuge="formData.conyuge"
            :hijos="formData.hijos"
            @nuevoConyuge="onClickNuevoConyuge"
            @nuevoHijo="onClickNuevoHijo"
            @eliminarConyuge="onEliminarConyuge"
            @editarConyuge="onEditarConyuge"
            @verConyuge="onVerConyuge"
            @eliminarHijo="onEliminarHijo"
            @editarHijo="onEditarHijo"
            @verHijo="onVerHijo"
        />
    </div>
    <div v-else>
        <DatosPersonalesFamiliaresForm 
            :formData="persona"
            :tipoCarga="tipoCarga"
            @cancelar-form="onCancelarForm"
            @guardar-form="onGuardarForm"
        />
    </div>
</template>
  
<script setup lang="ts">
    import { ref, reactive, toRefs, defineProps, watch } from 'vue';
    import { DatosFamiliaresFormType, SelectOption, Persona, EstadoCivil, Localidad, TipoDocumento, DatosPersonalesFormType } from '../../../types';
    import DatosFamiliaresTablas from './DatosFamiliaresTablas.vue';
    import DatosPersonalesFamiliaresForm from './DatosPersonalesFamiliaresForm.vue';

    const propsis = defineProps<{
        formData: DatosFamiliaresFormType;
        esconderControlesPredeterminados: boolean;
    }>()


    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosFamiliaresFormType, esconderControlesPredeterminados:boolean}>(propsis);
    const localFormData = reactive({ ...props.formData.value });
    const emit = defineEmits(['update:esconderControlesPredeterminados']);

    const orden = ref(0);
    const cargarPersona = ref(false);
    const personaDefault: DatosPersonalesFormType = {
        nroDocumento: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        domicilio: '',
        cuil: '',
    }

    const persona = ref<DatosPersonalesFormType>({...personaDefault});

    const tipoCarga = ref<'CONYUGE'| 'HIJO' | null>()

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    function onClickNuevoConyuge () {
        tipoCarga.value = 'CONYUGE';
        cargarPersona.value = true;
        emit('update:esconderControlesPredeterminados', true);
    }

    function onGuardarNuevoConyuge (personaNueva: DatosPersonalesFormType) {
        const {
            apellido, 
            nombre, 
            cuil, 
            domicilio, 
            email, 
            nroDocumento, 
            telefono, 
            estadoCivil, 
            fechaNacimiento, 
            localidad, 
            nacionalidad, 
            tipoDocumento
        } = personaNueva;
        
        if (estadoCivil && fechaNacimiento && localidad && nacionalidad && tipoDocumento) {
            props.formData.value.conyuge.value = {
                apellido,
                nombre,
                cuil,
                direccion: domicilio,
                email,
                nroDocumento,
                telefono,
                estado_civil: estadoCivil.value as EstadoCivil,
                fecha_nacimiento: fechaNacimiento, 
                localidad: { id: Number(localidad.value), codigo_postal:1, nombre:"efe"}, 
                nacionalidad: { nombre_en: "", nombre_es:""} , 
                tipo_documento: tipoDocumento.value as TipoDocumento
            }
        }
        Object.assign(persona.value, personaDefault);
    }

    function onGuardarNuevoHijo (personaNueva: DatosPersonalesFormType) {
        const {
            apellido, 
            nombre, 
            cuil, 
            domicilio, 
            email, 
            nroDocumento, 
            telefono, 
            estadoCivil, 
            fechaNacimiento, 
            localidad, 
            nacionalidad, 
            tipoDocumento
        } = personaNueva;
        
        if (estadoCivil && fechaNacimiento && localidad && nacionalidad && tipoDocumento) {
            const listadoDeHijos = props.formData.value.hijos;
            if (listadoDeHijos) {
                const orden = listadoDeHijos.length + 1;
                props.formData.value.hijos = [ 
                    ...listadoDeHijos,    
                    {
                        orden,
                        persona: {
                            apellido,
                            nombre,
                            cuil,
                            direccion: domicilio,
                            email,
                            nroDocumento,
                            telefono,
                            estado_civil: estadoCivil.value as EstadoCivil,
                            fecha_nacimiento: fechaNacimiento, 
                            localidad: localidad.value, 
                            nacionalidad: nacionalidad.value , 
                            tipo_documento: tipoDocumento.value as TipoDocumento
                        }
                    }
                ]
            }   
        }
        Object.assign(persona.value, personaDefault);
    }



    function onCancelarForm () {
        cargarPersona.value = false;
        emit('update:esconderControlesPredeterminados', false);
    }

    function onGuardarForm(persona:DatosPersonalesFormType) {
        cargarPersona.value = false;
        emit('update:esconderControlesPredeterminados', false);
        if (tipoCarga.value === 'CONYUGE') {
            onGuardarNuevoConyuge(persona)
        } else {
           onGuardarNuevoHijo(persona); 
        }
    }


    function onClickNuevoHijo () {
        tipoCarga.value = 'HIJO';
        cargarPersona.value = true;
        emit('update:esconderControlesPredeterminados', true);
    }

    function onEliminarConyuge() {
        props.formData.value.conyuge = null;
    }

    function onEditarConyuge() {

    }

    function onVerConyuge() {
        
    }

    function onEliminarHijo(hijo:Persona) {

    }

    function onEditarHijo(hijo:Persona) {

    }

    function onVerHijo(hijo:Persona) {
        
    }

</script>