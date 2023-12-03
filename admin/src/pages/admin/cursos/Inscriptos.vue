<template>    
      <va-card class="markup-tables mb-8">
        <va-card-content class="overflow-auto">
          <div class="flex flex-row">
            <div class="basis-8/12">
              <h4>Listado de inscriptos</h4>
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
              <va-button @click="onNuevaInscripto"> Nuevo inscripto </va-button>
            </div>
          </div>
  
          <table class="va-table w-full">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>DNI</th>
                <th>Fecha inscripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="inscripto in listadoDeInscriptos" :key="inscripto.id">
                <td>{{ inscripto.persona.nombre }} {{ inscripto.persona.apellido }}</td>
                <td>{{ inscripto.persona.tipo_documento }} {{ inscripto.persona.nroDocumento }}</td>
                <td>{{ transformarAFechaBostera(inscripto.fecha_creacion) }}</td>
                <td>
                  <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                    <va-button round icon="md_edit" @click="onEditarInscripto(inscripto)" />
                    <va-button round icon="md_delete" @click="onEliminarInscripto(inscripto)" />
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
            @ok="eliminarInscripto"
        />
      </va-card>  
  </template>
  
  <script setup lang="ts">

    import { computed, ComputedRef, ref,Ref, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useInscriptosStore } from '../../../stores/inscriptos-store';
    import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
    import { Inscripto, OrderDeOrdenamiento } from '../../../types';
    import { SelectOption } from 'vuestic-ui/web-components';
    import {transformarAFechaBostera} from '../../../services/utils/formatos'
    const inscriptosStore = useInscriptosStore();
    const router = useRouter();
    
    inscriptosStore.obtenerListadoDeInscriptos();

  inscriptosStore.obtenerListadoDeInscriptos()

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
  let inscriptoParaEliminar: Ref<Inscripto | null> = ref(null)
  let filtro: Ref<string> = ref('')
  let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0])
  let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0])
  let pagina: Ref<number> = ref(1)
  let limitePorPagina = 10

  const listadoDeInscriptos: ComputedRef<Inscripto[]> = computed(() => inscriptosStore.inscriptos)
  const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
    generarBotonesPaginacion(inscriptosStore.cantidadDeInscriptos, pagina.value, limitePorPagina),
  )
  const route = useRoute()

  const props = defineProps<{
    dictadoId: number
  }>()

  function onNuevaInscripto() {
    router.push({ name: 'nuevo-inscripto', params:{dictadoId: props.dictadoId} })
  }

  async function onEliminarInscripto(inscripto: Inscripto) {
    showSmallModal.value = true
    inscriptoParaEliminar.value = inscripto
  }

  async function eliminarInscripto() {
    if (inscriptoParaEliminar.value && inscriptoParaEliminar.value.id) {
      await inscriptosStore.borrarInscripto(inscriptoParaEliminar.value.id)
      inscriptosStore.obtenerListadoDeInscriptos()
    }
  }

  function onEditarInscripto(inscripto: Inscripto) {
    if (inscripto.id) {
      router.push({ name: 'editar-inscripto', params: { dictadoId: props.dictadoId, inscriptoId: inscripto.id } })
    }
  }

  function obtenerMensajeDeEliminacion(): string {
    if (inscriptoParaEliminar.value) {
      const {nombre, apellido} = inscriptoParaEliminar.value.persona;
        return `Esta a punto de eliminar el inscripto ${nombre} ${apellido}. ¿Esta seguro?`
    }
    return "Va a eliminar. ¿Está seguro?"
    
  }

  function onCambiaFiltro() {
    pagina.value = 1

    inscriptosStore.obtenerListadoDeInscriptos(
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
      inscriptosStore.obtenerListadoDeInscriptos(
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
      inscriptosStore.obtenerListadoDeInscriptos(
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
    inscriptosStore.obtenerListadoDeInscriptos(
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
  