<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">    
                    <div class="basis-8/12">
                        <h4> Listado de afiliados </h4>
                    </div>  

                    <div class="basis-2/12">
                        <va-select
                            v-model="ordenarPor"
                            label="Ordenar por"
                            :options="opcionesOrdenarPor"

                        />
                    </div>
                    <div class="basis-2/12">
                    <va-select
                        v-model="ordenDeOrdenamiento"
                        label="Dirección de ordenamiento"
                        :options="opcionesDeOrdenamientoListado"
                    />
                    </div>
                    <div class="basis-2/12">
                        <va-input
                            v-model="filtro"
                            placeholder="Filtrar..."
                            @change="onCambiaFiltro"
                        >
                        <template #prependInner>
                            <va-icon name="search" />
                        </template>
                        </va-input>
                    </div>
                    <div class="basis-2/12">
                        <va-button @click="onNuevaAula"> Nueva aula </va-button>
                    </div>
                </div>    

                <table class="va-table w-full">
                    <thead>
                        <tr>
                            <th> Nombre completo </th>
                            <th> DNI </th>
                            <th> Localidad </th>
                            <th> Direccion </th>
                            <th> Acciones </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="afiliado in listadoDeAFiliados" :key="afiliado.id">
                            <td>{{ `${afiliado.persona.nombre} ${afiliado.persona.apellido}`}} </td>
                            <td>{{ afiliado.persona.nroDocumento }}</td>
                            <td>{{ afiliado.persona.localidad.nombre }}</td>
                            <td>{{ afiliado.persona.direccion }}</td>
                            <td> 
                                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                                    <va-button 
                                        round
                                        icon="md_edit"
                                        @click="onEditarAfiliado(afiliado)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_delete"
                                        @click="onEliminarAfiliado(afiliado)"
                                    />
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
                        > {{ boton.pagina }}</va-button>
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
            @ok="eliminarAfiliado"
        />
    </va-content>
</template>

<script setup lang="ts">
    import { computed, ComputedRef, ref,Ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAfiliadosStore } from '../../../stores/afiliados-store';
    import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
    import { Afiliado, OrderDeOrdenamiento } from '../../../types';
    import { SelectOption } from 'vuestic-ui/web-components';
    const afiliadosStore = useAfiliadosStore();
    const router = useRouter();
    
    afiliadosStore.obtenerListadoDeAfiliados();

    const opcionesDeOrdenamientoListado:SelectOption[] = [{ value:'ASC', text:'Ascendente'}, {value:'DESC', text:'Descendente'}]
    const opcionesOrdenarPor:SelectOption[] = [
        { value:'nombre_completo', text:'Nombre completo'}, 
        { value:'dni', text:'DNI'}, 
        { value:'localidad', text:'Localidad'}, 
        { value:'direccion', text:'Dirección'}
    ];
    
    let showSmallModal = ref(false)
    let afiliadoParaEliminar:Ref<Afiliado| null> = ref(null)
    let filtro:Ref<string> = ref("")
    let ordenarPor:Ref<SelectOption> = ref(opcionesOrdenarPor[0]);
    let ordenDeOrdenamiento: Ref<SelectOption>= ref(opcionesDeOrdenamientoListado[0]);
    let pagina: Ref<number>= ref(1);
    let limitePorPagina = 10;

    const listadoDeAFiliados:ComputedRef<Afiliado[]> = computed(() => afiliadosStore.afiliados);
    const botonesDePaginacion:ComputedRef<any[]> = computed(() => generarBotonesPaginacion(afiliadosStore.cantidadDeAfiliados, pagina.value, limitePorPagina));

    function onNuevaAula() {
        router.push({name: 'nuevo-afiliado'});
    }

    async function onEliminarAfiliado(aula:Afiliado){
        showSmallModal.value = true;
        afiliadoParaEliminar.value = aula;
    }   

    async function eliminarAfiliado(){
        if (afiliadoParaEliminar.value && afiliadoParaEliminar.value.id){
            await afiliadosStore.borrarAula(afiliadoParaEliminar.value.id);
            afiliadosStore.obtenerListadoDeAfiliados();
        }
    }   

    function onEditarAfiliado(afiliado:Afiliado) {
        if (afiliado.id){
            router.push({name: 'editar-afiliado', params: {id:afiliado.id}});
        }
    }

    function obtenerMensajeDeEliminacion():string { 
        return `Esta a punto de inhabilitar al afiliado ${
            afiliadoParaEliminar.value !== null && `${afiliadoParaEliminar.value.persona.nombre} ${afiliadoParaEliminar.value.persona.apellido}`
        }. ¿Esta seguro?`
    }

    function onCambiaFiltro() { 
        pagina.value=1;

        afiliadosStore.obtenerListadoDeAfiliados(
            filtro.value, 
            {
                atributo: ordenarPor.value.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
            }, 
            1
        );
    }

    watch(() => ordenarPor.value, (nuevoOrden) => {
        afiliadosStore.obtenerListadoDeAfiliados(
            filtro.value, {
                atributo: nuevoOrden.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
            }, 
            pagina.value
        );
    });
    

    watch(() => ordenDeOrdenamiento.value, (nuevoOrden) => {
        afiliadosStore.obtenerListadoDeAfiliados(
            filtro.value, {
                atributo: ordenarPor.value.value,
                orden: nuevoOrden.value as OrderDeOrdenamiento
            },
            pagina.value
        );
    });
    
    function cambiarPagina(paginaSeleccionada:number) { 
        pagina.value = paginaSeleccionada;
        afiliadosStore.obtenerListadoDeAfiliados(
            filtro.value, 
            {
                atributo: ordenarPor.value.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
            }, 
            paginaSeleccionada
        );
    }

</script>
  