<template>
  <va-content class="typography content">
    <va-card class="markup-tables mb-8">
      <va-card-content class="overflow-auto">
        <div class="flex flex-row">
          <div class="basis-8/12">
            <h4>Listado de cursos</h4>
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
            <va-button @click="onNuevoCurso"> Nuevo curso </va-button>
          </div>
        </div>

        <table class="va-table w-full">
          <thead>
            <tr>
              <th>Código curso</th>
              <th>Nombre curso</th>
              <th>Categoria curso</th>
              <th>Tipo curso</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="curso in listadoDeCursos" :key="curso.id">
              <td>{{ curso.codigo_curso }}</td>
              <td>{{ curso.nombre_curso }}</td>
              <td>{{ curso.categoria_curso }}</td>
              <td>{{ curso.tipo_curso }}</td>
              <td>
                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                  <va-button round icon="md_edit" @click="onEditarCurso(curso)" />
                  <va-button round icon="md_delete" @click="onEliminarCurso(curso)" />
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
      @ok="eliminarCurso"
    />
  </va-content>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, ref,Ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCursosStore } from '../../../stores/cursos-store';
  import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
  import { Curso, OrderDeOrdenamiento } from '../../../types';
  import { SelectOption } from 'vuestic-ui/web-components';
  import listaEspera from './listaEspera.vue';
  
  const cursosStore = useCursosStore();
  const router = useRouter();
    
  cursosStore.obtenerListadoDeCursos();

  cursosStore.obtenerListadoDeCursos()

  const opcionesDeOrdenamientoListado: SelectOption[] = [
    { value: 'ASC', text: 'Ascendente' },
    { value: 'DESC', text: 'Descendente' },
  ]
  const opcionesOrdenarPor: SelectOption[] = [
    { value: 'codigo_curso', text: 'Código de curso' },
    { value: 'nombre_curso', text: 'Nombre' },
    { value: 'categoria_curso', text: 'Categoría' },
    { value: 'tipo_curso', text: 'Tipo' },
  ]

  let showSmallModal = ref(false)
  let cursoParaEliminar: Ref<Curso | null> = ref(null)
  let filtro: Ref<string> = ref('')
  let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0])
  let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0])
  let pagina: Ref<number> = ref(1)
  let limitePorPagina = 10

  const listadoDeCursos: ComputedRef<Curso[]> = computed(() => cursosStore.cursos)
  const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
    generarBotonesPaginacion(cursosStore.cantidadDeCursos, pagina.value, limitePorPagina),
  )

  function onNuevoCurso() {
    router.push({ name: 'nuevo-curso' })
  }

  async function onEliminarCurso(curso: Curso) {
    showSmallModal.value = true
    cursoParaEliminar.value = curso
  }

  async function eliminarCurso() {
    if (cursoParaEliminar.value && cursoParaEliminar.value.id) {
      await cursosStore.borrarCurso(cursoParaEliminar.value.id)
      cursosStore.obtenerListadoDeCursos()
    }
  }

  function onEditarCurso(curso: Curso) {
    if (curso.id) {
      router.push({ name: 'editar-curso', params: { id: curso.id } })
    }
  }

  function obtenerMensajeDeEliminacion(): string {
    return `Esta a punto de eliminar el curso ${
      cursoParaEliminar.value !== null && cursoParaEliminar.value.codigo_curso
    }. ¿Esta seguro?`
  }

  function onCambiaFiltro() {
    pagina.value = 1

    cursosStore.obtenerListadoDeCursos(
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
      cursosStore.obtenerListadoDeCursos(
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
      cursosStore.obtenerListadoDeCursos(
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
    cursosStore.obtenerListadoDeCursos(
      filtro.value,
      {
        atributo: ordenarPor.value.value,
        orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
      },
      paginaSeleccionada,
    )
  }
</script>