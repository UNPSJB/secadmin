<template>
    <div>
      <form @submit.prevent="siguientePaso">
        <div class="grid grid-cols-12 gap-6">
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input v-model="formData.sueldo" label="Sueldo" mask="numeral" />
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-select
                    v-model="formData.ocupacion"
                    :options="ocupacionesComercio"
                    label="Ocupación"
                    text-by="text"
                    track-by="value"
                />
            </div>
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-date-input
                    v-model="formData.fechaIngreso"
                    label="Fecha de ingreso"
                />            
            </div>
            
            

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <Suspense>
                    <EmpresasSelect
                        @update-empresa="updateEmpresa"
                        :nacionalidad="formData.empresa"
                    />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </div>
            
            
            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <div class="radio-wrapper">
                    <div class="header">
                        <label aria-hidden="true" class="header-label" style="color: rgb(21, 78, 193);">Carga horaria</label>
                    </div>
                    <div class="radio-group">     
                        <va-radio
                        v-model="selectedOption"
                        :option="TipoCargaHoraria.DIARIA"
                        name="radio-group"
                        />
                        <va-radio
                        v-model="selectedOption"
                        :option="TipoCargaHoraria.SEMANAL"
                        name="radio-group"
                        />
                    </div>
                </div>
            </div>

            <div class="flex md:col-span-6 sm:col-span-6 col-span-12">
                <va-input 
                    v-model="cargaHoraria" 
                    label="Carga horaria" 
                    mask="numeral" 
                    :rules="[(horas) => validarHoras(horas) || `Ingresa una cantidad de horas válida`]"
                />
            </div>
        </div>
      </form>
    </div>
</template>
  
<script setup lang="ts">
    import { reactive, toRefs, defineProps, watch, ref } from 'vue';
    import { ocupacionesComercio, DatosProfesionalesFormType,SelectOption, TipoCargaHoraria } from '../../../types';
    import EmpresasSelect from '../../../components/selectors/EmpresasSelect.vue';

    const propsis = defineProps<{
        formData: DatosProfesionalesFormType;
    }>()

    const selectedOption = ref<TipoCargaHoraria>(TipoCargaHoraria.DIARIA)
    const cargaHoraria = ref(0);

    // Acceder a las props con toRefs para mantener la reactividad
    const props = toRefs<{formData: DatosProfesionalesFormType}>(propsis);
    const localFormData = reactive({ ...props.formData.value });

    // Observar cambios en props.formData y actualizar localFormData
    watch(props.formData, (newFormData) => {
        Object.assign(localFormData, newFormData);
    });

    // Observar cambios en props.formData y actualizar localFormData
    watch(cargaHoraria, (newCargaHoraria) => {
        props.formData.value.cargaHoraria = {
            tipo: selectedOption.value,
            horas: newCargaHoraria
        }
    });

    function siguientePaso() {

    }

    function updateEmpresa (newEmpresa:SelectOption) {
        props.formData.value.empresa = newEmpresa;
    }

    function validarHoras(horas:string) {
        const horasAValidar = Number(horas);
        if (selectedOption.value === TipoCargaHoraria.DIARIA) {
            return horasAValidar > 0 && horasAValidar < 24
        } else {
            return horasAValidar > 0 && horasAValidar < 168 //24 * 7 = 168
        }
    }

</script>

<style> 

.header {
    display:block;
}

.radio-group {
    display: flex;
}


.radio-wrapper {
    display: block;
}

.header-label {
    font-weight: 700;
    font-family: 'Source Sans Pro', sans-serif;
}
</style>