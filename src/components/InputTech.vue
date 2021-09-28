
<template>
    <input 
        type="text" v-model.trim="tech.name" 
        placeholder="Nombre" :disabled="!editable"
        class="form-control my-3"    
    >
    <textarea 
        type="textarea" v-model.trim="tech.description" placeholder="Descripción"
        class="form-control my-3"
    ></textarea>
    <div class="form-check my-3">
        <h4 class="text-primary fw-bold">
            Nivel de conocimiento
        </h4>
        <div class="form-check">
            <label class="form-check-label" for="flexRadioDefault1">
                DESCONOCIDO
            </label>
            <input class="form-check-input" type="radio"  id="flexRadioDefault1" name="flexRadioDefault" v-model.trim="tech.knowledge" value="DESCONOCIDO">
        </div>
        <div class="form-check">
            <label class="form-check-label" for="flexRadioDefault2">
                CONOCIDO
            </label>
            <input class="form-check-input" type="radio"  id="flexRadioDefault2" name="flexRadioDefault" v-model.trim="tech.knowledge" value="CONOCIDO">
        </div>
        <div class="form-check">
            <label class="form-check-label" for="flexRadioDefault3">
                PRACTICADO
            </label>
            <input class="form-check-input" type="radio"  id="flexRadioDefault3" name="flexRadioDefault" v-model.trim="tech.knowledge" value="PRACTICADO">
        </div>
    </div>
        
    <button :disabled="!enabled || lock" class="btn btn-primary w-100 my-3" >
        {{text}}
    </button>
</template>

<script>

//@ts-check
import {validate} from '../validate'
import { computed, toRefs } from 'vue'
import {useStore} from 'vuex'
export default {
    props:{
        text: String,
        tech: Object,
        editable: {
            type: Boolean,
            default: true
        }
    },
    setup(props) {
        const {isEmpty} = validate()
        const {name, description, knowledge} = toRefs(props.tech)

        const store = useStore()
        
        const enabled = computed(()=>(
            !isEmpty(description.value) && !isEmpty(knowledge.value) && !isEmpty(name.value)
        ))
        const d=()=>{
            description.value = ''
        }

        const lock = computed(()=>(
            store.state.lock
        ))

        return{enabled, lock}
    },
}
</script>