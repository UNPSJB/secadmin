<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">
                    <div class="basis-10/12">
                        <h4> {{ esEdicion? 'Editar Empresa' : 'Nueva empresa' }} </h4>
                    </div>
                </div>
                <form>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <va-input v-model="razonSocial" label="Razon social" />
                        </div>
                        <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                            <va-input v-model="cuit" label="CUIT" />
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
import { useEmpresasStore } from '../../../stores/empresas-store';
import { useToast } from 'vuestic-ui'
import { Empresa, Localidad } from '../../../types';

const router = useRouter();
const route = useRoute();
const empresasStore = useEmpresasStore();
const { init } = useToast();

const razonSocial = ref("");
const cuit = ref("");
const direccion = ref("");
const localidad:Ref<Localidad | null> = ref(null);

const esEdicion = route.name === 'editar-empresa';

if(esEdicion) {
    empresasStore.obtenerEmpresa(route.params.id as string);
}

function updateLocalidad (newLocalidad:any) {
    localidad.value = newLocalidad;
}

function onCancelar() {
    router.push({ name: 'empresas' });
}

const sePuedeGuardar = computed(() => 
    razonSocial.value !== "" && 
    cuit.value !== "" &&
    direccion.value !== "" &&
    localidad.value !== null 
);

function onLimpiar() {
    razonSocial.value = "";
    cuit.value = "";
    direccion.value = ""
    localidad.value = null;
}

async function onGuardar() {
    try {
        if(esEdicion) {
            await empresasStore.actualizarEmpresa(
                route.params.id as string,
                razonSocial.value,
                cuit.value, 
                localidad.value, 
                direccion.value
            )
        } else {
            await empresasStore.guardarEmpresa(razonSocial.value,cuit.value, localidad.value, direccion.value);
        }
        init({
            message: 'Empresa guardada correctamente',
            position: 'bottom-right',
            duration: 2500,
        })
        router.push({ name: 'empresas' });
    } catch (e: any) {
        init({
            message: e.message,
            position: 'bottom-right',
            duration: 2500,
            color: "danger"
        })  
    }
}


const empresaParaEditar:ComputedRef<Empresa | null> = computed(() => empresasStore.empresa)


watch(empresaParaEditar as any, (empresaAEditar:Empresa) => {
    if(empresaAEditar) {
        razonSocial.value = empresaAEditar.razon_social;
        cuit.value = empresaAEditar.cuit;
        direccion.value = empresaAEditar.direccion;
        localidad.value = empresaAEditar.localidad;
    }
})

</script>
  