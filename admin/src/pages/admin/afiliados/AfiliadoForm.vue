<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">
                    <div class="basis-10/12">
                        <h4> {{ esEdicion? 'Editar afiliado' : 'Nuevo afiliado' }} </h4>
                    </div>
                </div>
                <va-stepper
                    v-model="step"
                    linear
                    :steps="steps"
                    :controlsHidden="esconderControlesPredeterminados"
                    :navigation-disabled="esconderControlesPredeterminados"
                    @finish="onGuardar"
                    >
                    <template #step-content-0>
                        <DatosPersonalesForm :form-data="datosPersonales"/>
                    </template>
                    <template #step-content-1>
                        <DatosLaboralesForm :form-data="datosPersonales"/>
                    </template>
                    <template #step-content-2>
                        <DatosFamiliaresForm 
                            :form-data="datosPersonales" 
                            :esconderControlesPredeterminados="esconderControlesPredeterminados"
                            @update:esconderControlesPredeterminados="actualizarEsconderControlesPredeterminados"    
                        />
                    </template>

                </va-stepper>
                    <!-- <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
                        <va-button @click="onCancelar" preset="outline" border-color="primary"> Cancelar </va-button>
                    </div>
                    <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
                        <va-button @click="onLimpiar" preset="outline" border-color="primary"> Limpiar </va-button>
                    </div>
                    <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
                        <va-button 
                            @click="onGuardar"
                            :disabled="!sePuedeGuardar"    
                        > Guardar </va-button>
                    </div> -->
            </va-card-content>
        </va-card>
    </va-content>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, Ref, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useAfiliadosStore } from '../../../stores/afiliados-store';
import { useToast } from 'vuestic-ui'
import { Localidad, DatosPersonalesFormType, Afiliado, DatosProfesionalesFormType, TipoCargaHoraria } from '../../../types';
import DatosPersonalesForm from './DatosPersonalesForm.vue';
import DatosFamiliaresForm from './DatosFamiliaresForm.vue';
import DatosLaboralesForm from './DatosLaboralesForm.vue';

const router = useRouter();
const route = useRoute();
const afiliadosStore = useAfiliadosStore();
const { init } = useToast();

const datosPersonales = ref<DatosPersonalesFormType>({
    nroDocumento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    domicilio: '',
    cuil: '',
});

const datosLaborales = ref<DatosProfesionalesFormType>({
    sueldo: 0,
    cargaHoraria: { tipo: TipoCargaHoraria.DIARIA, horas:0},
    empresa: null,
    fechaIngreso: new Date(),
    ocupacion: null
});

const localidad:Ref<Localidad | null> = ref(null);
const step = ref(0)
const esconderControlesPredeterminados = ref(false);

const steps = ref([
  {
    label: 'Datos personales',
    beforeLeave: (step:any) => {
      step.hasError = !validaDatosPersonales()
    },
  },
  { label: 'Datos laborales', beforeLeave: (step:any) => { } },
  { label: 'Datos familiares', beforeLeave: (step:any) => { } },
])


const esEdicion = route.name === 'editar-aula';

if(esEdicion) {
    afiliadosStore.obtenerAfiliado(route.params.id as string);
}

function updateLocalidad (newLocalidad:any) {
    localidad.value = newLocalidad;
}

function onCancelar() {
    router.push({ name: 'aulas' });
}

async function onGuardar() {
    debugger
    console.log('guardando afiliado');

    init({
        message: 'Afiliado guardado correctamente',
        position: 'bottom-right',
        duration: 2500,
    })

    // try {
    //     if(esEdicion) {
    //         await afiliadosStore.actualizarAfiliado({datosPersonales})
    //     } else {
    //         await aulasStore.guardarAula(codigoAula.value,capacidad.value, localidad.value, direccion.value);
    //     }
    //     init({
    //         message: 'Aula guardada correctamente',
    //         position: 'bottom-right',
    //         duration: 2500,
    //     })
    //     router.push({ name: 'aulas' });
    // } catch (e: any) {
    //     init({
    //         message: e.message,
    //         position: 'bottom-right',
    //         duration: 2500,
    //         color: "danger"
    //     })  
    // }
}


const afiliadoParaEditar:ComputedRef<Afiliado | null> = computed(() => afiliadosStore.afiliado)


watch(afiliadoParaEditar as any, (afiliadoAEditar:Afiliado) => {
    if(afiliadoAEditar) {
        datosPersonales.value = afiliadoAEditar.persona;
    }
})

function actualizarEsconderControlesPredeterminados(nuevoValor:boolean) {
    esconderControlesPredeterminados.value = nuevoValor;
}

function validaDatosPersonales() {
    return false
}

</script>
  