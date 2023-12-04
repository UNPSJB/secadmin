<template>
  <va-card class="markup-tables mb-8">
    <va-card-content class="overflow-auto">
      <div class="flex flex-row">
        <div class="basis-8/12">
          <h4>Lista de espera</h4>
        </div>

        <div class="basis-2/12">
          <va-select v-model="ordenarPor" label="Ordenar por" :options="opcionesOrdenarPor" />
        </div>
        <div class="basis-2/12">
          <va-select v-model="ordenDeOrdenamiento" label="Dirección de ordenamiento" :options="opcionesDeOrdenamientoListado" />
        </div>
        <div class="basis-2/12">
          <va-input v-model="filtro" placeholder="Filtrar..." @change="onCambiaFiltro">
            <template #prependInner>
              <va-icon name="search" />
            </template>
          </va-input>
        </div>
        <div class="basis-2/12">
          <va-button @click="onAgregarInscripto"> Agregar Inscripto </va-button>
        </div>
      </div>

      <table class="va-table w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Fecha de inscripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="listadoEspera in listaDeEspera" :key="listadoEspera.id">
            <td>{{ listadoEspera.persona?.nombre }}</td>
            <td>{{ listadoEspera.persona?.apellido }}</td>
            <td>{{ listadoEspera.persona?.nroDocumento }}</td>
            <td>{{ transformarAFechaBostera(listadoEspera.fecha_creacion) }}</td>
            <td>
            <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
              <va-button round icon="md_edit" @click="onEditarListaEspera(listadoEspera)" />
              <va-button round icon="md_delete" @click="onEliminarListaEspera(listadoEspera)" />
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
            {{ boton.pagina }}
          </va-button>
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
      @ok="EliminarListaEspera"
    />
  </va-card>
</template>


<script setup lang="ts">
import { ComputedRef, Ref, computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { uselistaEsperaStore } from '../../../stores/listaEspera-store';
import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
import { OrderDeOrdenamiento, listaEspera } from '../../../types';
import { SelectOption } from 'vuestic-ui/web-components';
import {Inscripto } from '../../../types'; 
import { transformarAFechaBostera } from '../../../services/utils/formatos';



const listaDeEsperaStore = uselistaEsperaStore();
const router = useRouter();


const opcionesDeOrdenamientoListado: SelectOption[] = [
  { value: 'ASC', text: 'Ascendente' },
  { value: 'DESC', text: 'Descendente' },
];
const opcionesOrdenarPor: SelectOption[] = [
  { value: 'nombre', text: 'Nombre' },
  { value: 'apellido', text: 'Apellido' },
  { value: 'dni', text: 'DNI' },
  { value: 'fecha_Inscripcion', text: 'Fecha Inscripción' },
];

let showSmallModal = ref(false);
let listaDeEsperaParaEliminar: Ref<listaEspera | null> = ref(null);
let filtro: Ref<string> = ref('');
let ordenarPor: Ref<SelectOption> = ref(opcionesOrdenarPor[0]);
let ordenDeOrdenamiento: Ref<SelectOption> = ref(opcionesDeOrdenamientoListado[0]);
let pagina: Ref<number> = ref(1);
let limitePorPagina = 10;

const listaDeEspera: ComputedRef<Inscripto[]> = computed(() => listaDeEsperaStore.listasEspera)
  const botonesDePaginacion: ComputedRef<any[]> = computed(() =>
    generarBotonesPaginacion(listaDeEsperaStore.cantidadDeInscriptos, pagina.value, limitePorPagina),
  )
  const route = useRoute()

  const props = defineProps<{
    cursoId: number
  }>()
  listaDeEsperaStore.obtenerListaDeEspera(Number(route.params.id))

  function onAgregarInscripto() {
    router.push({ name: 'nuevo-inscripto-curso', params:{cursoId: props.cursoId}});
  }


async function onEliminarListaEspera(listaEspera: listaEspera) {
  showSmallModal.value = true;
  listaDeEsperaParaEliminar.value = listaEspera;
}

async function EliminarListaEspera() {
  try {
    if (listaDeEsperaParaEliminar.value && listaDeEsperaParaEliminar.value.id) {
      // Obtén el ID del inscrito que deseas eliminar
      const inscriptoId = listaDeEsperaParaEliminar.value.id;

      // Llama a la acción del store para borrar el inscrito
      await listaDeEsperaStore.borrarListaEspera(inscriptoId);

      // Elimina el inscrito de la lista local
      listaDeEsperaStore.listasEspera = listaDeEsperaStore.listasEspera.filter(
        (inscripto) => inscripto.id !== inscriptoId
      );
    }
  } catch (error) {
    console.error('Error al eliminar inscrito de la lista de espera:', error);
  }
}



function onEditarListaEspera(listaEspera:Inscripto) {
  if (listaEspera.id) {
      router.push({ name: 'editar-inscripto-curso', params: { inscriptoId: listaEspera.id, cursoId: props.cursoId } })
    }
}

function obtenerMensajeDeEliminacion(): string {
  if (listaDeEsperaParaEliminar.value && listaDeEsperaParaEliminar.value.inscripto) {
    const { nombre, apellido, nroDocumento } = listaDeEsperaParaEliminar.value.inscripto.persona;
    return `Está a punto de eliminar al inscripto ${nombre} ${apellido} con DNI ${nroDocumento}. ¿Está seguro?`;
  }
  return "Va a eliminar. ¿Está seguro?";
}

function onCambiaFiltro() {}

watch(
  () => ordenarPor.value,
  (nuevoOrden) => {
    listaDeEsperaStore.obtenerlistaDeEspera(
      Number(route.params.id),
      filtro.value,
      {
        atributo: nuevoOrden.value,
        orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
      },
      pagina.value
    );
  }
);

watch(
  () => ordenDeOrdenamiento.value,
  (nuevoOrden) => {
    listaDeEsperaStore.obtenerlistaDeEspera(
      Number(route.params.id),
      filtro.value,
      {
        atributo: ordenarPor.value.value,
        orden: nuevoOrden.value as OrderDeOrdenamiento,
      },
      pagina.value,
      route.params.id
    );
  }
);

function cambiarPagina(paginaSeleccionada: number) {
  pagina.value = paginaSeleccionada;
  listaDeEsperaStore.obtenerlistaDeEspera(
    Number(route.params.id),
    filtro.value,
    {
      atributo: ordenarPor.value.value,
      orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
    },
    paginaSeleccionada
  );
}
</script>
