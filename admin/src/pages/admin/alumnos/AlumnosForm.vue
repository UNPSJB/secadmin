<template>
  <va-content class="typography content">
      <va-card class="markup-tables mb-8">
         <va-card-content class="overflow-auto">
            <div class="flex flex-row">
              <div class="basis-10/12">
                  <h4>{{ esEdicion ? 'Editar profesor' : 'Nueva profesor' }}</h4>
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
                <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input v-model="especialidad" label="Especialidad" />
                </div>
                <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input v-model="descripcion" label="Descripción" />
                </div>
                <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                    <va-input v-model="honorarios" label="Honorarios" />
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
import { useAlumnosStore } from '../../../stores/alumnos-store'
import { useToast } from 'vuestic-ui'
//import { vMaska } from 'maska'
import { Alumno, DatosPersonalesFormType,TipoDocumento, Localidad, SelectOption, listadoEstadosCiviles, listaDocumentos } from '../../../types'
import { esEmail, esDocumentoValido, esNumeroDeTelefonoCompleto, esMayorDeCiertaEdad, esCUILValido } from '../../../services/utils/validaciones'
import { usePersonasStore } from '../../../stores/personas-store';


const personasStore = usePersonasStore()
const router = useRouter()
const route = useRoute()
const alumnoStore = useAlumnosStore()
const { init } = useToast()
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
const especialidad = ref('')
const honorarios= ref(0)
const descripcion = ref('')
const localidad:Ref<Localidad | null> = ref(null);
const esEdicion = route.name === 'editar-alumno'
const personaEncontrada = ref<any>(null)
const mostrarModalDePersonaEncontrada = ref(false);


if (esEdicion) {
  alumnoStore.obtenerAlumno(route.params.id as string)
}


function onCancelar() {
  router.push({ name: 'alumnos' })
}

const sePuedeGuardar = computed(
  () => datosPersonales.value.nroDocumento !== '' && honorarios.value > 1 && especialidad.value !== '' && descripcion.value !== '',
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
descripcion.value = ('') 
especialidad.value = ('') 
honorarios.value = 0
}

async function onGuardar() {
  try {
    if (esEdicion) {
    //  await alumnoStore.actualizarAlumno(
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
       await alumnoStore.guardarAlumno({
            datosPersonales: {
              ...datosPersonales.value,
              localidad: datosPersonales.value.localidad.value,
              nacionalidad: datosPersonales.value.nacionalidad.id,

            }
        })
      init({
        message: 'Alumno guardado correctamente',
        position: 'bottom-right',
        duration: 2500,
      })
      router.push({ name: 'Alumno' })
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

const alumnoParaEditar: ComputedRef<Alumno | null> = computed(() => AlumnoStore.alumno)

watch(alumnoParaEditar as any, (alumnoAEditar: Alumno) => {
  if(alumnoAEditar) {
        datosPersonales.value = alumnoAEditar.persona;
    }
})

function buscarDocumento() {
        const {tipoDocumento, nroDocumento } = props.formData.value;
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
        props.formData.value.nombre = data.nombre; 
        props.formData.value.apellido = data.apellido;
        props.formData.value.telefono = data.telefono;
        props.formData.value.direccion = data.direccion;
        props.formData.value.cuil = data.cuil;
        props.formData.value.email = data.usuario.email;
        props.formData.value.fecha_nacimiento = new Date(data.fecha_nacimiento);
        props.formData.value.estado_civil = data.estado_civil;
}




const propsis = defineProps<{
        formData: DatosPersonalesFormType;
}>()

const props = toRefs<{formData: DatosPersonalesFormType}>(propsis);
function updateLocalidad (newLocalidad:SelectOption) {
        props.formData.value.localidad = newLocalidad;
    }

    function updateNacionalidad (newNacionalidad:SelectOption) {
        props.formData.value.nacionalidad = newNacionalidad;
    }

</script>