<template>
    <va-content class="typography content">
        <va-card class="markup-tables mb-8">
            <va-card-content class="overflow-auto">
                <div class="flex flex-row">    
                    <div class="basis-10/12">
                        <h4> Listado de aulas </h4>
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
    </va-content>
</template>

<script setup lang="ts">
    import { computed, ComputedRef } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAulasStore } from '../../../stores/aulas-store';

    const aulasStore = useAulasStore();

    const router = useRouter();

    aulasStore.obtenerListadoDeAulas();

    const listadoDeAulas:ComputedRef<Aula[]> = computed(() => aulasStore.aulas);

    function onNuevaAula() {
        router.push({name: 'nueva-aula'});
    }

    async function onEliminarAula(aula:Aula){
        if (aula.id){
            await aulasStore.borrarAula(aula.id);
            aulasStore.obtenerListadoDeAulas();
        }
    }   

    function onEditarAula(aula:Aula) {
        if (aula.id){
            router.push({name: 'editar-aula', params: {id:aula.id}});
        }
    }

</script>
  