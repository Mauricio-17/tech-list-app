<template>
    <div class="container-sm mt-3">
        <h2 class="text-center text-primary fw-bold">Tecnologia a saber</h2>
        <form @submit.prevent="addTechnology">
            <input-tech :text="'Agregar'" :tech="tech" />
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue'
import {useStore} from 'vuex'
import InputTech from '../components/InputTech.vue'
export default {
    components:{
        InputTech
    },
    setup(){

        const store = useStore() 

        let tech = reactive({
            name: '',
            description: '',
            knowledge: ''
        })

        const addTechnology = ()=>{
            const copyTech = {...tech}
            store.dispatch('addTechnology', copyTech)
        }

        return { tech, addTechnology}
    }

}
</script>

<style>

</style>