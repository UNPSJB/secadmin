<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">    
                    <div class="basis-8/12">
                        <h4> Listado de aulas </h4>
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
                            <th> Código aula </th>
                            <th> Capacidad </th>
                            <th> Localidad </th>
                            <th> Direccion </th>
                            <th> Acciones </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="aula in listadoDeAulas" :key="aula.id">
                            <td>{{ aula.codigo_aula }}</td>
                            <td>{{ aula.capacidad }}</td>
                            <td>{{ aula.localidad.nombre }}</td>
                            <td>{{ aula.direccion }}</td>
                            <td> 
                                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                                    <va-button 
                                        round
                                        icon="md_edit"
                                        @click="onEditarAula(aula)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_delete"
                                        @click="onEliminarAula(aula)"
                                    />
                                </va-button-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </va-card-content>
        </va-card>
        <va-modal
            v-model="showSmallModal"
            size="small"
            title="Confirmar eliminación"
            :message="obtenerMensajeDeEliminacion()"
            ok-text="Eliminar"
            cancel-text="Cancelar"
            @ok="eliminarAula"
        />
    </va-content>
</template>

<script setup lang="ts">
    import { computed, ComputedRef, ref,Ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAulasStore } from '../../../stores/aulas-store';
    
    const aulasStore = useAulasStore();
    const router = useRouter();
    
    aulasStore.obtenerListadoDeAulas();

    const opcionesDeOrdenamientoListado:SelectOption[] = [{ value:'ASC', text:'Ascendente'}, {value:'DESC', text:'Descendente'}]
    const opcionesOrdenarPor:SelectOption[] = [
        { value:'codigo_aula', text:'Código de aula'}, 
        { value:'capacidad', text:'Capacidad'}, 
        { value:'localidad', text:'Localidad'}, 
        { value:'direccion', text:'Dirección'}
    ];
    
    
    let showSmallModal = ref(false)
    let aulaParaEliminar:Ref<Aula| null> = ref(null)
    let filtro:Ref<string> = ref("")
    let ordenarPor:Ref<SelectOption> = ref(opcionesOrdenarPor[0]);
    let ordenDeOrdenamiento: Ref<SelectOption>= ref(opcionesDeOrdenamientoListado[0]);

    const listadoDeAulas:ComputedRef<Aula[]> = computed(() => aulasStore.aulas);

    function onNuevaAula() {
        router.push({name: 'nueva-aula'});
    }

    async function onEliminarAula(aula:Aula){
        showSmallModal.value = true;
        aulaParaEliminar.value = aula;
    }   

    async function eliminarAula(){
        if (aulaParaEliminar.value && aulaParaEliminar.value.id){
            await aulasStore.borrarAula(aulaParaEliminar.value.id);
            aulasStore.obtenerListadoDeAulas();
        }
    }   

    function onEditarAula(aula:Aula) {
        if (aula.id){
            router.push({name: 'editar-aula', params: {id:aula.id}});
        }
    }

    function obtenerMensajeDeEliminacion():string { 
        return `Esta a punto de eliminar el aula ${aulaParaEliminar.value !== null && aulaParaEliminar.value.codigo_aula}. ¿Esta seguro?`
    }

    function onCambiaFiltro() { 
        aulasStore.obtenerListadoDeAulas(filtro.value, {
            atributo: ordenarPor.value.value,
            orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
        });
    }

    watch(() => ordenarPor.value, (nuevoOrden) => {
        aulasStore.obtenerListadoDeAulas(filtro.value, {
            atributo: nuevoOrden.value,
            orden: ordenDeOrdenamiento.value.value as OrderDeOrdenamiento
        });
    });
    

    watch(() => ordenDeOrdenamiento.value, (nuevoOrden) => {
        aulasStore.obtenerListadoDeAulas(filtro.value, {
            atributo: ordenarPor.value.value,
            orden: nuevoOrden.value as OrderDeOrdenamiento
        });
    });
    

</script>
  