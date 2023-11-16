<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">    
                    <div class="basis-8/12">
                        <h4> Listado de Empresas </h4>
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
                        <va-button @click="onNuevaEmpresa"> Nueva empresa </va-button>
                    </div>
                </div>    

                <table class="va-table w-full">
                    <thead>
                        <tr>
                            <th> Razon social </th>
                            <th> CUIT </th>
                            <th> Localidad </th>
                            <th> Direccion </th>
                            <th> Acciones </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="empresa in listadoDeEmpresas" :key="empresa.id">
                            <td>{{ empresa.razon_social }}</td>
                            <td>{{ empresa.cuit }}</td>
                            <td>{{ empresa.localidad.nombre }}</td>
                            <td>{{ empresa.direccion }}</td>
                            <td> 
                                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                                    <va-button 
                                        round
                                        icon="md_edit"
                                        @click="onEditarEmpresa(empresa)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_delete"
                                        @click="onEliminarEmpresa(empresa)"
                                    />
                                </va-button-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="wrapper">
                    <va-button-group class="button-group">
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
            @ok="eliminarEmpresa"
        />
    </va-content>
</template>

<script setup lang="ts">
    import { computed, ComputedRef, ref,Ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useEmpresasStore } from '../../../stores/empresas-store';
    import { generarBotonesPaginacion } from '../../../services/paginacion/paginacion.service';
    import { SelectOption, Empresa, OrderDeOrdenamiento } from '../../../types';
    const empresasStore = useEmpresasStore();
    const router = useRouter();
    
    empresasStore.obtenerListadoDeEmpresas();

    const opcionesDeOrdenamientoListado:SelectOption[] = [{ value:'ASC', text:'Ascendente'}, {value:'DESC', text:'Descendente'}]
    const opcionesOrdenarPor:SelectOption[] = [
        { value:'razon_social', text:'Razon social'}, 
        { value:'cuit', text:'CUIT'}, 
        { value:'localidad', text:'Localidad'}, 
        { value:'direccion', text:'Dirección'}
    ];
    
    let showSmallModal = ref(false)
    let empresaParaEliminar:Ref<Empresa| null> = ref(null)
    let filtro:Ref<string> = ref("")
    let ordenarPor:Ref<SelectOption> = ref(opcionesOrdenarPor[0]);
    let ordenDeOrdenamiento: Ref<SelectOption>= ref(opcionesDeOrdenamientoListado[0]);
    let pagina: Ref<number>= ref(1);
    let limitePorPagina = 10;

    const listadoDeEmpresas:ComputedRef<Empresa[]> = computed(() => empresasStore.empresas);
    const botonesDePaginacion:ComputedRef<any[]> = computed(() => generarBotonesPaginacion(empresasStore.cantidadDeEmpresas, pagina.value, limitePorPagina));

    function onNuevaEmpresa() {
        router.push({name: 'nueva-empresa'});
    }

    async function onEliminarEmpresa(empresa:Empresa){
        showSmallModal.value = true;
        empresaParaEliminar.value = empresa;
    }   

    async function eliminarEmpresa(){
        if (empresaParaEliminar.value && empresaParaEliminar.value.id){
            await empresasStore.borrarEmpresa(empresaParaEliminar.value.id);
            empresasStore.obtenerListadoDeEmpresas();
        }
    }   

    function onEditarEmpresa(empresa:Empresa) {
        if (empresa.id){
            router.push({name: 'editar-empresa', params: {id:empresa.id}});
        }
    }

    function obtenerMensajeDeEliminacion():string { 
        return `Esta a punto de eliminar el empresa ${empresaParaEliminar.value !== null && empresaParaEliminar.value.razon_social}. ¿Esta seguro?`
    }

    function onCambiaFiltro() { 
        pagina.value=1;

        empresasStore.obtenerListadoDeEmpresas(
            filtro.value, 
            {
                atributo: ordenarPor.value.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
            }, 
            1
        );
    }

    watch(() => ordenarPor.value, (nuevoOrden) => {
        empresasStore.obtenerListadoDeEmpresas(
            filtro.value, {
                atributo: nuevoOrden.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
            }, 
            pagina.value
        );
    });
    

    watch(() => ordenDeOrdenamiento.value, (nuevoOrden) => {
        empresasStore.obtenerListadoDeEmpresas(
            filtro.value, {
                atributo: ordenarPor.value.value,
                orden: nuevoOrden.value as OrderDeOrdenamiento
            },
            pagina.value
        );
    });
    
    function cambiarPagina(paginaSeleccionada:number) { 
        pagina.value = paginaSeleccionada;
        empresasStore.obtenerListadoDeEmpresas(
            filtro.value, 
            {
                atributo: ordenarPor.value.value,
                orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento,
            }, 
            paginaSeleccionada
        );
    }

</script>
  
<style>
.wrapper {
    position: relative;
    display: block;
}

.button-group {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
</style>