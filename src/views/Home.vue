<template>
    <div class="container">
        <h2 class="text-center text-primary fw-bold my-3">
            Lista de tecnologias
        </h2>

        <input type="text" placeholder="Tecnologia a buscar" class="form-control my-3" v-model.trim="word" @keyup="keyProcess">

        <div class="text-center mt-10" v-if="loading">
            <div class="spinner-grow text-info mx-1" role="status">
            </div>
            <div class="spinner-grow text-info mx-1" role="status">
            </div>
            <div class="spinner-grow text-info mx-1" role="status">
            </div>
            <div class="spinner-grow text-info mx-1" role="status">
            </div>
            <h2 class="text-info ">
                Cargando contenido ...
            </h2>
        </div>
        
        <div class="row" v-else>
            <div 
            class="my-4 col col-sm-12 col-md-6 col-lg-4 " v-for="(item, index) in technologies" :key="index" 
            >
                <div class="bg-primary p-1 card">
                    <h3 class="text-light ">
                        Nombre: {{item.name}}
                    </h3>
                    <div class="desc bg-light text-primary px-2 fs-5">
                        <p>Breve descripción: {{item.description}}</p>
                    </div>
                    <h4 class="text-light p-1">
                        Nivel de conocimiento: {{item.knowledge}}
                    </h4>
                </div>
                <div class="d-flex justify-content-between my-1">
                    <router-link 
                        class="col btn btn-outline-warning  mx-md-3  mx-1" 
                        :to="`/editing/${item.id}`"
                        @click="setTechnology(item)"
                        :disabled="lock"
                    >
                        EDITAR
                    </router-link>
                    <button 
                        class="col btn btn-outline-danger mx-md-3 mx-1 "
                        @click="removeTechnology(item)"
                        :disabled="lock"
                    >
                        ELIMINAR
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
//@ts-check
import {useStore} from 'vuex'
import { computed, onMounted, ref } from 'vue'
export default {
    components: {
    },
    setup() {
        const store = useStore()
        let technologies = computed(()=>
            store.state.techsFiltered
        )
        const setTechnology = (technology)=>{
            store.dispatch('setTechnology', technology)
        }
        const removeTechnology = (technology)=>{
            store.dispatch('deleteTechnology', technology)
        }
        const lock = computed(()=>(
            store.state.lock
        ))
        const loading = computed(()=>(
            store.state.loading
        ))
        const keyProcess = () =>{
            store.dispatch('techsFiltered', word.value)
        }

        const word = ref('')
        onMounted(async ()=>{
            await store.dispatch('getTechnologies')
        })

        return {technologies, setTechnology, removeTechnology,lock, loading, keyProcess, word}
    },
}
</script>

<style scoped>
 .desc{
    border-radius: 15px
}
</style>