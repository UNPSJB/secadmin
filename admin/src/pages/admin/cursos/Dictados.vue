<template>    
  <va-card class="markup-tables mb-8">
      <va-card-content class="overflow-auto">
        <div class="flex flex-row">
          <div class="basis-8/12">
            <h4>Listado de dictados</h4>
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
            <va-button @click="onNuevaDictado"> Nuevo dictado </va-button>
          </div>
        </div>

        <table class="va-table w-full">
          <thead>
            <tr>
              <th>Profesor a cargo</th>
              <th>Capacidad</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="dictado in listadoDeDictados" :key="dictado.id">
              <td>{{ dictado.profesor.persona.nombre }} {{ dictado.profesor.persona.apellido }}</td>
              <td>{{ dictado.capacidad }}</td>
              <td>{{ transformarAFechaBostera(dictado.fecha_inicio) }}</td>
              <td>{{ transformarAFechaBostera(dictado.fecha_fin) }}</td>
              <td>
                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                  <va-button round icon="md_edit" @click="onEditarDictado(dictado)" />
                  <va-button round icon="md_delete" @click="onEliminarDictado(dictado)" />
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
      <va-modal
          v-model="showSmallModal"
          size="small"
          title="Confirmar eliminación"
          :message="obtenerMensajeDeEliminacion()"
          ok-text="Eliminar"
          cancel-text="Cancelar"
          @ok="eliminarDictado"
      />
    </va-card>  
</template>

<script setup lang="ts">

  import { computed, ComputedRef, ref,Ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useDictadosStore } from '../../../stores/dictados-store';
  import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
  import { Dictado, OrderDeOrdenamiento } from '../../../types';
  import { SelectOption } from 'vuestic-ui/web-components';
  import {transformarAFechaBostera} from '../../../services/utils/formatos'
  const dictadosStore = useDictadosStore();
  const router = useRouter();
    
  const opcionesDeOrdenamientoListado: SelectOption[] = [
    { value: 'ASC', text: 'Ascendente' },
    { value: 'DESC', text: 'Descendente' },
  ]
  const opcionesOrdenarPor: SelectOption[] = [
    { value: 'profesor', text: 'Profesor' },
    { value: 'capacidad', text: 'Capacidad' },
    { value: 'fecha_inicio', text: 'Fecha Inicio' },
    { value: 'fecha_fin', text: 'Fecha Fin' },
  ]

  let showSmallModal = ref(false)
  let dictadoParaEliminar: Ref<Dictado | null> = ref(null)
  let filtro: Ref<string> = ref('')
  let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0])
  let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0])
  let pagina: Ref<number> = ref(1)
  let limitePorPagina = 10

  const listadoDeDictados: ComputedRef<Dictado[]> = computed(() => dictadosStore.dictados)
  const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
    generarBotonesPaginacion(dictadosStore.cantidadDeDictados, pagina.value, limitePorPagina),
  )
  const route = useRoute()

  const props = defineProps<{
    cursoId: number
  }>()
  dictadosStore.obtenerListadoDeDictados(Number(route.params.id))

  function onNuevaDictado() {
    router.push({ name: 'nuevo-dictado', params:{cursoId: props.cursoId} })
  }

  async function onEliminarDictado(dictado: Dictado) {
    showSmallModal.value = true
    dictadoParaEliminar.value = dictado
  }

  async function eliminarDictado() {
    if (dictadoParaEliminar.value && dictadoParaEliminar.value.id) {
      await dictadosStore.borrarDictado(dictadoParaEliminar.value.id)
      dictadosStore.obtenerListadoDeDictados()
    }
  }

  function onEditarDictado(dictado: Dictado) {
    if (dictado.id) {
      router.push({ name: 'editar-dictado', params: { cursoId: route.params.id ,dictadoId: dictado.id } })
    }
  }

  function obtenerMensajeDeEliminacion(): string {
    if (dictadoParaEliminar.value) {
        const {fecha_inicio, fecha_fin, profesor} = dictadoParaEliminar.value;
        return `Esta a punto de eliminar el dictado que corresponde a las fechas ${fecha_inicio} al ${
            fecha_fin
        } a cargo del profesor ${profesor.persona.nombre} ${fecha_inicio}. ¿Esta seguro?`
    }
    return "Va a eliminar. ¿Está seguro?"
    
  }

  function onCambiaFiltro() {
    pagina.value = 1

    dictadosStore.obtenerListadoDeDictados(
        Number(route.params.id),
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
      dictadosStore.obtenerListadoDeDictados(
        Number(route.params.id),
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
      dictadosStore.obtenerListadoDeDictados(
        Number(route.params.id),
        filtro.value,
        {
          atributo: ordenarPor.value.value,
          orden: nuevoOrden.value as OrderDeOrdenamiento,
        },
        pagina.value,route.params.id
      )
    },
  )

  function cambiarPagina(paginaSeleccionada: number) {
    pagina.value = paginaSeleccionada
    dictadosStore.obtenerListadoDeDictados(
        Number(route.params.id),
        filtro.value,
        {
            atributo: ordenarPor.value.value,
            orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
        },
        paginaSeleccionada,
    )
  }

  </script>
  