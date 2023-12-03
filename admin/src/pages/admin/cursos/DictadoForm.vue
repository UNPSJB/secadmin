<template>
  <va-content class="typography content">
    <va-card class="markup-tables mb-8">
      <va-card-content class="overflow-auto">
        <div class="flex flex-row">
          <div class="basis-10/12">
            <h4>{{ esEdicion ? 'Editar Dictado' : 'Nuevo Dictado' }}</h4>
          </div>
        </div>
        <form>
          <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
              <Suspense>
                <profesores-select 
                  @update-profesor="updateProfesor"
                  :profesor="profesor" 
                />
                  <template #fallback>
                    Loading...
                  </template>
              </Suspense>
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                  v-model="precio" 
                  label="Precio general"
                  mask="numeral"                      
                />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                  v-model="precio_afiliado" 
                  label="Precio para afiliado"
                  mask="numeral"                      
                />
            </div>
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                  v-model="capacidad" 
                  label="Capacidad"
                  mask="numeral"                      
                />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="fecha_inicio"
                    label="Fecha de inicio"
                    :monthNames="['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']"
                    :weekdayNames="['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']"
                />            
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="fecha_fin"
                    label="Fecha de finalización"
                    :monthNames="['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']"
                    :weekdayNames="['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']"
                />            
            </div>
          </div>
        </form>
        <div class="grid grid-cols-12 gap-6">
          <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
            <va-button preset="outline" border-color="primary" @click="onCancelar"> Cancelar </va-button>
          </div>
          <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
            <va-button preset="outline" border-color="primary" @click="onLimpiar"> Limpiar </va-button>
          </div>
          <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
            <va-button :disabled="!sePuedeGuardar" @click="onGuardar"> Guardar </va-button>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </va-content>
</template>

<script setup lang="ts">
import { ref, computed, watch, ComputedRef } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useDictadosStore } from '../../../stores/dictados-store';
import { useToast } from 'vuestic-ui'
import { Dictado, Profesor } from '../../../types';
import Dictados from './Dictados.vue';
import ProfesoresSelect from '../../../components/selectors/ProfesoresSelect.vue';

const router = useRouter()
const route = useRoute()
const dictadosStore = useDictadosStore()
const { init } = useToast()

const profesor = ref<Profesor | null>(null) 
const precio = ref<number>(0);
const precio_afiliado = ref<number>(0);
const capacidad = ref<number>(0);
const fecha_inicio = ref <Date>(new Date());
const fecha_fin = ref <Date>(new Date());

const esEdicion = route.name === 'editar-dictado';

if (esEdicion) {
  dictadosStore.obtenerDictado(route.params.id as string)
}

function onCancelar() {
  router.push({ name: 'editar-curso', params: {id: route.params.cursoId } })
}

const sePuedeGuardar = computed(
  () => true
)

function onLimpiar() {
}

function updateProfesor(profesor:any) {
  profesor.value = profesor;
}

async function onGuardar() {
  try {
    if (esEdicion) {
      //await dictadosStore.actualizarDictado()
    } else {
      //await dictadosStore.guardarDictado(codigoDictado.value, nombreDictado.value, categoriaDictado.value, tipoDictado.value)
    }
    init({
      message: 'Dictado guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'editar-curso', params:{id:route.params.cursoId} })
    } catch (e: any) {
      init({
        message: e.message,
        position: 'bottom-right',
        duration: 2500,
        color: 'danger',
      })
  }
}

const dictadoParaEditar: ComputedRef<Dictado | null> = computed(() => dictadosStore.dictado)

watch(dictadoParaEditar as any, (dictadoAEditar: Dictado) => {
  if (dictadoAEditar) {
    profesor.value = dictadoAEditar.profesor;
    precio.value = dictadoAEditar.precio
    precio_afiliado.value = dictadoAEditar.precio_afiliado;
    capacidad.value = dictadoAEditar.capacidad;
    fecha_inicio.value = dictadoAEditar.fecha_inicio;
    fecha_fin.value = dictadoAEditar.fecha_fin;
  }
})
</script>
