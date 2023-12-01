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
                    v-model="datosPersonales.fechaNacimiento"
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
                    v-model="datosPersonales.estadoCivil"
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
                    v-model="datosPersonales.domicilio" 
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
import { ref, reactive, toRefs, defineProps, watch, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useProfesorStore } from '../../../stores/profesores-store'
import { useToast } from 'vuestic-ui'
import { Profesor, DatosPersonalesFormType,listaDocumentos, SelectOption, listadoEstadosCiviles } from '../../../types'
import NacionalidadesSelect from '../../../components/selectors/NacionalidadesSelect.vue';
import LocalidadesSelect from '../../../components/selectors/LocalidadesSelect.vue';
import { esEmail, esDocumentoValido, esNumeroDeTelefonoCompleto, esMayorDeCiertaEdad, esCUILValido } from '../../../services/utils/validaciones'

const datosPersonales = ref<DatosPersonalesFormType>({
    nroDocumento: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    domicilio: '',
    cuil: '',
});

const router = useRouter()
const route = useRoute()
const profesorStore = useProfesorStore()
const { init } = useToast()

const nombre = ref('')
const apellido = ref('')
const dni = ref('')
const email = ref('')
const descripcion = ref('')
const especialidad = ref('')
const honorarios = ref()

const esEdicion = route.name === 'editar-profesor'

if (esEdicion) {
  profesorStore.obtenerProfesor(route.params.id as string)
}


function onCancelar() {
  router.push({ name: 'profesores' })
}

const sePuedeGuardar = computed(
  () => dni.value !== '' && honorarios.value > 1 && especialidad.value !== '' && descripcion.value !== '',
)

function onLimpiar() {
nombre.value
apellido.value
dni.value
email.value
descripcion.value
especialidad.value
honorarios.value = null
}

async function onGuardar() {
  try {
    if (esEdicion) {
    //  await profesorStore.actualizarProfesor(
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
      await profesorStore.guardarProfesor({
      datosPersonales: datosPersonales.value
    })
    }
    init({
      message: 'Profesor guardado correctamente',
      position: 'bottom-right',
      duration: 2500,
    })
    router.push({ name: 'Profesor' })
  } catch (e: any) {
    init({
      message: e.message,
      position: 'bottom-right',
      duration: 2500,
      color: 'danger',
    })
  }
}

const profesorParaEditar: ComputedRef<Profesor | null> = computed(() => profesorStore.profesor)

watch(profesorParaEditar as any, (profesorAEditar: Profesor) => {
  if (profesorAEditar) {
    nombre.value = profesorAEditar.persona.nombre
    apellido.value = profesorAEditar.persona.apellido
    dni.value = profesorAEditar.persona.nroDocumento
    email.value = profesorAEditar.persona.email
    descripcion.value = profesorAEditar.descripcion
    especialidad.value = profesorAEditar.especialidad
    honorarios.value = profesorAEditar.honorarios
  }
})

</script>