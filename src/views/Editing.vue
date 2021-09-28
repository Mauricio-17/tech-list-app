<template>
    <div class="container-sm mt-3">
        <h2 class="text-center text-primary fw-bold">
            Actualizar
        </h2>
        <form @submit.prevent="editTechnology">
            <input-tech :text="'EDITAR'" :tech="technology" :editable="false"/>
        </form>
    </div>
</template>

<script>
import InputTech from '../components/InputTech.vue'
import {useStore} from 'vuex'
import { computed } from 'vue'
export default {
    components: { InputTech },
    setup(){
        const store = useStore()

        const technology = computed(()=> store.state.technology)
        const editTechnology = ()=>{
            store.dispatch('updateTechnology', technology.value)
        }
        

        return {technology, editTechnology}
    }

}
</script>

<style>

</style>