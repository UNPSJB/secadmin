<template>
    <va-content class="typography content">
      <va-card class="markup-tables mb-8">
        <va-card-content class="overflow-auto">
          <div class="flex flex-row">
            <div class="basis-8/12">
              <h4>Listado de alumnos</h4>
            </div>
  
            <div class="basis-2/12">
              <va-select v-model="ordenarPor" label="Ordenar por" :options="opcionesOrdenarPor" />
            </div>

            <div class="basis-2/12">
              <va-select
                v-model="ordenDeOrdenamiento"
                label="Dirección de ordenamiento"
                :options="opcionesDeOrdenamientoListado"
              />
            </div>
            <div class="basis-2/12">
              <va-input v-model="filtro" placeholder="Filtrar..." @change="onCambiaFiltro">
                <template #prependInner>
                  <va-icon name="search" />
                </template>
              </va-input>
            </div>
            <div class="basis-2/12">
              <va-button @click="onNuevoAlumno"> Nuevo Alumno </va-button>
            </div>
          </div>
  
          <table class="va-table w-full">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Especialidad</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="alumno in listadoDeAlumnos" :key="alumno.id">
                <td>{{ `${alumno.persona.nombre} ${alumno.persona.apellido}`}} </td>
                <td>{{ alumno.persona.apellido }}</td>
                <td>{{ alumno.persona.nroDocumento }}</td>
                <td>{{ alumno.persona.email }}</td>
                <td>{{ alumno.curso }}</td>
                <td>{{ alumno.descripcion }}</td>
                <td>{{ alumno.honorarios }}</td>
                <td>
                  <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                    <va-button round icon="md_edit" @click="onEditarAlumno(alumno)" />
                    <va-button round icon="md_delete" @click="onEliminarAlumno(alumno)" />
                  </va-button-group>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="wrapper">
            <va-button-group class="botton-group">
              <va-button
                v-for="boton in botonesDePaginacion"
                :key="boton.pagina"
                :disabled="boton.selected"
                @click="cambiarPagina(boton.pagina)"
              >
                {{ boton.pagina }}</va-button
              >
            </va-button-group>
          </div>
        </va-card-content>
      </va-card>
      <va-modal
        v-model="showSmallModal"
        size="small"
        title="Confirmar eliminación"
        :message="obtenerMensajeDeEliminacion()"
        ok-text="Eliminar"
        cancel-text="Cancelar"
        @ok="EliminarAlumno"
      />
    </va-content>
  </template>

<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAlumnoStore } from '../../../stores/alumnos-store'
import { Alumno, OrderDeOrdenamiento } from '../../../types';
import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service'
import { SelectOption } from 'vuestic-ui/web-components';
const alumnoStore = useAlumnoStore()
const router = useRouter()

alumnoStore.obtenerListadoDeAlumnos()

const opcionesDeOrdenamientoListado: SelectOption[] = [
  { value: 'ASC', text: 'Ascendente' },
  { value: 'DESC', text: 'Descendente' },
]
const opcionesOrdenarPor: SelectOption[] = [
  { value: 'nombre', text: 'Nombre' },
  { value: 'apellido', text: 'Apellido' },
  { value: 'dni', text: 'DNI' },
  { value: 'especilidad', text: 'Especialidad' },
  { value: 'descripcion', text: 'Descripcion' },
  { value: 'honorarios', text: 'Honorarios' },
]

let showSmallModal = ref(false)
let alumnoParaEliminar: Ref<Alumno | null> = ref(null)
let filtro: Ref<string> = ref('')
let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0])
let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0])
let pagina: Ref<number> = ref(1)
let limitePorPagina = 10

const listadoDeAlumnos: ComputedRef<Alumnos[]> = computed(() => alumnoStore.alumno || [])
const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
  generarBotonesPaginacion(alumnoStore.cantidadDeAlumnoes, pagina.value, limitePorPagina),
)

function onNuevoAlumno() {
  router.push({ name: 'nuevo-alumno' })
}

async function onEliminarAlumno(alumno: Alumno) {
  showSmallModal.value = true
  alumnoParaEliminar.value = alumno
}

async function EliminarAlumno() {
  if (alumnoParaEliminar.value && alumnoParaEliminar.value.id) {
    await alumnoStore.borrarAlumno(alumnoParaEliminar.value.id)
    alumnoStore.obtenerListadoDeAlumnos()
  }
}

function onEditarAlumno(alumno: Alumno) {
  if (alumno.id) {
    router.push({ name: 'editar-alumno', params: { id: alumno.id } })
  }
}

function obtenerMensajeDeEliminacion(): string {
  return `Esta a punto de eliminar un alumno ${
    alumnoParaEliminar.value !== null && alumnoParaEliminar.value.persona.nroDocumento
  }. ¿Esta seguro?`
}

function onCambiaFiltro() {
  pagina.value = 1

    alumnoStore.obtenerListadoDeAlumnos(
    filtro.value,
    {
      atributo: ordenarPor.value.value,
      orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
    },
    1,
  )
}

watch(
  () => ordenarPor.value,
  (nuevoOrden) => {
    alumnoStore.obtenerListadoDeAlumnos(
      filtro.value,
      {
        atributo: nuevoOrden.value,
        orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
      },
      pagina.value,
    )
  },
)

watch(
  () => ordenDeOrdenamiento.value,
  (nuevoOrden) => {
    alumnoStore.obtenerListadoDeAlumnos(
      filtro.value,
      {
        atributo: ordenarPor.value.value,
        orden: nuevoOrden.value as OrderDeOrdenamiento,
      },
      pagina.value,
    )
  },
)

function cambiarPagina(paginaSeleccionada: number) {
  pagina.value = paginaSeleccionada
  alumnoStore.obtenerListadoDeAlumnos(
    filtro.value,
    {
      atributo: ordenarPor.value.value,
      orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
    },
    paginaSeleccionada,
  )
}
</script>