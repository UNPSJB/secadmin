<template>
  <va-content class="typography content">
      <va-card class="markup-tables mb-8">
         <va-card-content class="overflow-auto">
            <div class="flex flex-row">
              <div class="basis-10/12">
                  <h4>{{ esEdicion ? 'Editar inscripto' : 'Nuevo inscripto' }}</h4>
              </div>
            </div>
            <form>
                <div class="grid grid-cols-12 gap-6">
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-select
                      v-model="datosPersonales.tipoDocumento"
                      :options="listaDocumentos"
                      label="Tipo de documento"
                      text-by="text"
                      value-by="value"
                    />
                  </div>
                

                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input 
                      v-model="datosPersonales.nroDocumento" 
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
                          :disabled="!esDocumentoValido(datosPersonales.nroDocumento)"
                        />
                      </template>
                    </va-input>
                  </div>
          
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                  <va-input 
                    v-model="datosPersonales.nombre" 
                    label="Nombre"
                    :disabled="!sePuedeEditar"
                  />
                  </div>
          
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input 
                      v-model="datosPersonales.apellido" 
                      label="Apellido" 
                      :disabled="!sePuedeEditar"
                    />
                  </div>
          
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input 
                      v-model="datosPersonales.email" 
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
                      v-model="datosPersonales.fecha_nacimiento"
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
                      v-model="datosPersonales.estado_civil"
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
                        :localidad="datosPersonales.localidad"                    
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
                        :nacionalidad="datosPersonales.nacionalidad"
                        :disabled="!sePuedeEditar"
                      />
                      <template #fallback>
                        Loading...
                      </template>
                    </Suspense>
                  </div>
            
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                      <va-input 
                        v-model="datosPersonales.direccion" 
                        label="Domicilio"
                        :disabled="!sePuedeEditar"
                      />
                  </div>
            
                  <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input 
                      v-model="datosPersonales.cuil" 
                      label="CUIL" 
                      :disabled="!sePuedeEditar"
                      v-maska
                      data-maska="##-########-#"
                      :rules="[(v)=> !v || esCUILValido(v) || 'El CUIL ingresado no es válido']"

                    />
                  </div>
                </div>
            </form>
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
            <div class="grid grid-cols-12 gap-6">
              <div class="flex md:col-span-4 sm:col-span-4 col-span-4">
                <va-button preset="outline" border-color="primary" @click="onCancelar"> Volver </va-button>
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
import { ref,watch, computed, Ref, ComputedRef, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useInscriptosStore } from '../../../stores/inscriptos-store'
import { useToast } from 'vuestic-ui'
import { vMaska } from 'maska'
import NacionalidadesSelect from '../../../components/selectors/NacionalidadesSelect.vue';
import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';
import { Inscripto, DatosPersonalesFormType,TipoDocumento, Localidad, SelectOption, listadoEstadosCiviles, listaDocumentos } from '../../../types'
import { esEmail, esDocumentoValido, esNumeroDeTelefonoCompleto, esMayorDeCiertaEdad, esCUILValido } from '../../../services/utils/validaciones'
import { usePersonasStore } from '../../../stores/personas-store';
import { DatePickerView } from 'vuestic-ui/dist/types/components/va-date-picker/types';
import { uselistaEsperaStore } from "../../../stores/listaEspera-store";

const personasStore = usePersonasStore()
const router = useRouter()
const route = useRoute()
const inscriptoStore = useInscriptosStore()
const { init } = useToast()
const fechaDeNacimientoView = ref<DatePickerView>({type: "year", year: 2000, month:1})    
const sePuedeEditar = ref(false);

const datosPersonales = ref<DatosPersonalesFormType>({
  nroDocumento: '',
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  cuil: '',
});
const telefono = ref("");
const localidad:Ref<Localidad | null> = ref(null);
const esEdicion = route.name === 'editar-inscripto'
const personaEncontrada = ref<any>(null)
const mostrarModalDePersonaEncontrada = ref(false);

const listaDeEsperaStore = uselistaEsperaStore()
if (esEdicion) {
inscriptoStore.obtenerInscripto(route.params.id as string)
}


function onCancelar() {
  debugger
  if (route.name === "nuevo-inscripto-curso" || route.name === "editar-inscripto-curso") { 
    router.push({ name: 'editar-curso', params:{ id: route.params.cursoId} })
  } else {
    router.push({ name: 'editar-dictado', params:{ cursoId: route.params.cursoId, dictadoId: route.params.dictadoId} })
  }
}

const sePuedeGuardar = computed(
  () => datosPersonales.value.nroDocumento !== ''
)

function onLimpiar() {
  datosPersonales.value = {
    nroDocumento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    cuil: '',
  }
}

async function onGuardar() {
try {
  if (esEdicion) {
  //  await inscriptoStore.actualizarInscripto(
  //    route.params.id as string,
  //    nombre.value,
  //    apellido.value,
  //    dni.value,
  //    email.value,
  //    descripcion.value,
  //    especialidad.value,
  //    honorarios.value,
  //  )
  } else {
    if (route.name === "nuevo-inscripto-curso" || route.name === "editar-inscripto-curso") {
      await listaDeEsperaStore.guardarlistaDeEspera({
        curso: route.params.cursoId,
        datosPersonales: {
          ...datosPersonales.value,
          localidad: datosPersonales.value.localidad.value,
          nacionalidad: datosPersonales.value.nacionalidad.id,
        }
      })
    } else {
      await inscriptoStore.guardarInscripto({
        dictado: route.params.dictadoId,
        datosPersonales: {
          ...datosPersonales.value,
          localidad: datosPersonales.value.localidad.value,
          nacionalidad: datosPersonales.value.nacionalidad.id,
        }
      })
    }
    init({
      message: 'Inscripto guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    if (route.name === "nuevo-inscripto-curso" || route.name === "editar-inscripto-curso") {
      router.push({ name: 'editar-curso', params:{ id: route.params.cursoId } })
    } else { 
      router.push({ name: 'editar-dictado', params:{ cursoId: route.params.cursoId, dictadoId: route.params.dictadoId} })
    }
  }
} catch (e: any) {
  init({
    message: e.message,
    position: 'bottom-right',
    duration: 2500,
    color: 'danger',
  })
}
}

const inscriptoParaEditar: ComputedRef<Inscripto | null> = computed(() => inscriptoStore.inscripto)

watch(inscriptoParaEditar as any, (inscriptoAEditar: Inscripto) => {
if(inscriptoAEditar) {
      datosPersonales.value = inscriptoAEditar.persona;
  }
})

function buscarDocumento() {
      const {tipoDocumento, nroDocumento } = datosPersonales.value;
      if(esDocumentoValido(nroDocumento)) {
          personasStore.obtenerPersonaPorDocumento(tipoDocumento.value, nroDocumento, onPersonaEncontrada)
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
      sePuedeEditar.value = true;
      const data = personaEncontrada.value;
      datosPersonales.value.nombre = data.nombre; 
      datosPersonales.value.apellido = data.apellido;
      datosPersonales.value.telefono = data.telefono;
      datosPersonales.value.direccion = data.direccion;
      datosPersonales.value.cuil = data.cuil;
      datosPersonales.value.email = data.usuario.email;
      datosPersonales.value.fecha_nacimiento = new Date(data.fecha_nacimiento);
      datosPersonales.value.estado_civil = data.estado_civil;
}


function updateLocalidad (newLocalidad:SelectOption) {
      datosPersonales.value.localidad = newLocalidad;
  }

  function updateNacionalidad (newNacionalidad:SelectOption) {
      datosPersonales.value.nacionalidad = newNacionalidad;
  }

</script>