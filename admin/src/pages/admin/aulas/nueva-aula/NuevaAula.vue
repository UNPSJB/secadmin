<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">
                    <div class="basis-10/12">
                        <h4> Nueva aula </h4>
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
                        <va-button @click="onGuardar"> Guardar </va-button>
                    </div>
                </div>
            </va-card-content>
        </va-card>
    </va-content>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import LocalidadesSelect from '../../../../components/selectors/LocalidadesSelect.vue';
import { useAulasStore } from '../../../../stores/aulas-store';

const router = useRouter();
const aulasStore = useAulasStore()

const codigoAula = ref("");
const capacidad = ref(0);
const direccion = ref("");
const localidad = ref(null);

function updateLocalidad (newLocalidad:any) {
    localidad.value = newLocalidad;
}

function onCancelar() {
    router.push({ name: 'aulas' });
}

function onLimpiar() {
    codigoAula.value = "";
    capacidad.value = 0;
    direccion.value = ""
    localidad.value = null;
}

async function onGuardar() {
    try {
        await aulasStore.guardarAula(codigoAula.value,capacidad.value, localidad.value, direccion.value);
        router.push({ name: 'aulas' });
    } catch (e) {

    }
}

function onGuardadoCorrectamente() {
    router.push({ name: 'aulas' });
}
</script>
  