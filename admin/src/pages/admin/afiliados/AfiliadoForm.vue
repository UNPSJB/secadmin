<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">
                    <div class="basis-10/12">
                        <h4> {{ esEdicion? 'Editar Aula' : 'Nueva aula' }} </h4>
                    </div>
                </div>
                <form>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <va-input v-model="codigoAula" label="Código aula" />
                        </div>
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <va-input v-model="capacidad" label="Capacidad" mask="numeral" />
                        </div>
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <Suspense>
                                <LocalidadesSelect 
                                    @update-localidad="updateLocalidad"
                                    :localidad="localidad"
                                />
                                <template #fallback>
                                    Loading...
                                </template>
                            </Suspense>

                        </div>
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <va-input v-model="direccion" label="Dirección" />
                        </div>
                    </div>
                </form>
                <div class="grid grid-cols-12 gap-6">
                    <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
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
                    </div>
                </div>
            </va-card-content>
        </va-card>
    </va-content>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, Ref, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';
import { useAulasStore } from '../../../stores/aulas-store';
import { useToast } from 'vuestic-ui'
import { Aula, Localidad } from '../../../types';

const router = useRouter();
const route = useRoute();
const aulasStore = useAulasStore();
const { init } = useToast();

const codigoAula = ref("");
const capacidad = ref(0);
const direccion = ref("");
const localidad:Ref<Localidad | null> = ref(null);

const esEdicion = route.name === 'editar-aula';

if(esEdicion) {
    aulasStore.obtenerAula(route.params.id as string);
}

function updateLocalidad (newLocalidad:any) {
    localidad.value = newLocalidad;
}

function onCancelar() {
    router.push({ name: 'aulas' });
}

const sePuedeGuardar = computed(() => 
    codigoAula.value !== "" && 
    capacidad.value > 1 &&
    direccion.value !== "" &&
    localidad.value !== null 
);

function onLimpiar() {
    codigoAula.value = "";
    capacidad.value = 0;
    direccion.value = ""
    localidad.value = null;
}

async function onGuardar() {
    try {
        if(esEdicion) {
            await aulasStore.actualizarAula(
                route.params.id as string,
                codigoAula.value,
                capacidad.value, 
                localidad.value, 
                direccion.value
            )
        } else {
            await aulasStore.guardarAula(codigoAula.value,capacidad.value, localidad.value, direccion.value);
        }
        init({
            message: 'Aula guardada correctamente',
            position: 'bottom-right',
            duration: 2500,
        })
        router.push({ name: 'aulas' });
    } catch (e: any) {
        init({
            message: e.message,
            position: 'bottom-right',
            duration: 2500,
            color: "danger"
        })  
    }
}


const aulaParaEditar:ComputedRef<Aula | null> = computed(() => aulasStore.aula)


watch(aulaParaEditar as any, (aulaAEditar:Aula) => {
    if(aulaAEditar) {
        codigoAula.value = aulaAEditar.codigo_aula;
        capacidad.value = aulaAEditar.capacidad;
        direccion.value = aulaAEditar.direccion;
        localidad.value = aulaAEditar.localidad;
    }
})

</script>
  