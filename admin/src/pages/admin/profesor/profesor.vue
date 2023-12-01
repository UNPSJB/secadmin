<template>
    <va-content class="typography content">
      <va-card class="markup-tables mb-8">
        <va-card-content class="overflow-auto">
          <div class="flex flex-row">
            <div class="basis-8/12">
              <h4>Listado de profesores</h4>
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
              <va-button @click="onNuevoProfesor"> Nuevo profesor </va-button>
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
              <tr v-for="profesor in listadoDeProfesores" :key="profesor.id">
                <td>{{ `${profesor.persona.nombre} ${profesor.persona.apellido}`}} </td>
                <td>{{ profesor.persona.apellido }}</td>
                <td>{{ profesor.persona.nroDocumento }}</td>
                <td>{{ profesor.persona.email }}</td>
                <td>{{ profesor.especialidad }}</td>
                <td>{{ profesor.descripcion }}</td>
                <td>{{ profesor.honorarios }}</td>
                <td>
                  <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                    <va-button round icon="md_edit" @click="onEditarProfesor(profesor)" />
                    <va-button round icon="md_delete" @click="onEliminarProfesor(profesor)" />
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
        @ok="EliminarProfesor"
      />
    </va-content>
  </template>

<script setup lang="ts">
import { computed, ComputedRef, ref, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProfesorStore } from '../../../stores/profesores-store'
import { Profesor, OrderDeOrdenamiento } from '../../../types';
import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service'
import { SelectOption } from 'vuestic-ui/web-components';
const profesorStore = useProfesorStore()
const router = useRouter()

profesorStore.obtenerListadoDeProfesores()

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
let profesorParaEliminar: Ref<Profesor | null> = ref(null)
let filtro: Ref<string> = ref('')
let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0])
let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0])
let pagina: Ref<number> = ref(1)
let limitePorPagina = 10

const listadoDeProfesores: ComputedRef<Profesor[]> = computed(() => profesorStore.profesor || [])
const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
  generarBotonesPaginacion(profesorStore.cantidadDeProfesores, pagina.value, limitePorPagina),
)

function onNuevoProfesor() {
  router.push({ name: 'nuevo-profesor' })
}

async function onEliminarProfesor(profesor: Profesor) {
  showSmallModal.value = true
  profesorParaEliminar.value = profesor
}

async function EliminarProfesor() {
  if (profesorParaEliminar.value && profesorParaEliminar.value.id) {
    await profesorStore.borrarProfesor(profesorParaEliminar.value.id)
    profesorStore.obtenerListadoDeProfesores()
  }
}

function onEditarProfesor(profesor: Profesor) {
  if (profesor.id) {
    router.push({ name: 'editar-profesor', params: { id: profesor.id } })
  }
}

function obtenerMensajeDeEliminacion(): string {
  return `Esta a punto de eliminar un profesor ${
    profesorParaEliminar.value !== null && profesorParaEliminar.value.persona.nroDocumento
  }. ¿Esta seguro?`
}

function onCambiaFiltro() {
  pagina.value = 1

    profesorStore.obtenerListadoDeProfesores(
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
    profesorStore.obtenerListadoDeProfesores(
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
    profesorStore.obtenerListadoDeProfesores(
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
  profesorStore.obtenerListadoDeProfesores(
    filtro.value,
    {
      atributo: ordenarPor.value.value,
      orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
    },
    paginaSeleccionada,
  )
}
</script>