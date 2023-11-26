<template>
    <form>
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-10">
                <h5> Datos de cónyuge </h5>
                <div v-if="!conyuge">
                    <p>No tiene datos de conyuge cargado</p>
                </div>
                <div v-else> 
                    <table class="va-table w-full">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{ conyuge.nombre }}</td>
                            <td>{{ conyuge.email }}</td>
                            <td> 
                                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                                    <va-button 
                                        round
                                        icon="md_eye"
                                        @click="emitVerConyuge(conyuge)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_edit"
                                        @click="emitEditarConyuge(conyuge)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_delete"
                                        @click="emitEliminarConyuge(conyuge)"
                                    />
                                </va-button-group>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-span-2">
                <va-button v-if="conyuge === null" @click="emitNuevoConyuge"> Cargar cónyuge </va-button>
            </div>
            
        </div>
        <hr class="my-4 border-gray-200" />
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-10">
                <h5> Datos de hijos </h5>
                <div v-if="!hijos || hijos.length === 0">
                    <p>No tiene datos de hijos cargados</p>
                </div>
                <div v-else> 
                    <table class="va-table w-full">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>DNI</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="hijo in hijos">
                            <td>{{ hijo.persona.nombre }}</td>
                            <td>{{ hijo.persona.nroDocumento }}</td>
                            <td> 
                                <va-button-group class="col-span-12 xl:col-span-6" preset="plain">
                                    <va-button 
                                        round
                                        icon="md_eye"
                                        @click="emitVerHijo(hijo)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_edit"
                                        @click="emitEditarHijo(hijo)" 
                                    />
                                    <va-button 
                                        round
                                        icon="md_delete"
                                        @click="emitEliminarHijo(hijo)"
                                    />
                                </va-button-group>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-span-2">
                <va-button @click="onNuevoHijo"> Cargar hijo </va-button>
            </div>
        </div>
      </form>
</template>

<script setup lang="ts"> 
import { defineProps } from 'vue';
import { Persona } from '../../../types';

const props = defineProps({
    conyuge: Object as () => Persona|null,
    hijos: Object as () => {orden: number, persona:Persona}[]
});

const emit = defineEmits(['nuevoConyuge', 'nuevoHijo', 'eliminarConyuge', 'editarConyuge', 'verConyuge', 'eliminarHijo', 'editarHijo', 'verHijo']);

function emitNuevoConyuge () {
    emit("nuevoConyuge");
}

function emitNuevoHijo () {
    emit("nuevoHijo");
}

function emitEliminarConyuge(conyuge:Persona) {
    emit("eliminarConyuge", conyuge);
}  

function emitEditarConyuge(conyuge:Persona) {
    emit("editarConyuge", conyuge);
}

function emitVerConyuge(conyuge:Persona) {
    emit("verConyuge", conyuge);
}

function emitEliminarHijo(hijo:{orden: number, persona:Persona}) {
    emit("eliminarHijo", hijo);
}

function emitEditarHijo(hijo:{orden: number, persona:Persona}) {
    emit("editarHijo", hijo);
}

function emitVerHijo(hijo:{orden: number, persona:Persona}) {
    emit("verHijo", hijo);
}



</script>