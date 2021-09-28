<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="text-primary text-center fw-bold my-4 col col-md-8">
                Registro de usuario
            </h2>
        </div>
        <div class="row justify-content-center">
            <form @submit.prevent="signUpEmail(email, psw1)"
            class="col col-md-8">
                <input type="text" class="form-control my-3" placeholder="Ingrese email de usuario" v-model.trim="email">

                <input type="password" class="form-control my-3" placeholder="Ingrese contraseña" v-model.trim="psw1">
                
                <input type="password" class="form-control my-3" name="password" placeholder="Repita contraseña" v-model.trim="psw2">

                <p v-if="!areEquals(psw1,psw2)" class="text-danger">
                    Contraseña distinta a la anterior
                </p>
                <!-- ERROR-->
                <p v-if="error" class="text-danger">{{error}}</p>
                <button type="submit" class="btn btn-primary w-100 my-3" :disabled="!enable">
                    REGISTRAR CON EMAIL
                </button>
            </form>           
        </div>

    </div>
</template>

<script>
//@ts-check
import { useUser } from '../composables/useUser'
import { useStore} from 'vuex'
import { computed, ref } from 'vue';
import { validate} from '../validate'

export default {
    setup() {
        const store = useStore()
        const { signUpEmail } = useUser()
        const {areEquals, amountCharacters, isAnEmail} = validate()
        const error = computed(()=>(
            store.state.error
        ))

        let email = ref('')
        let psw1 = ref('')
        let psw2 = ref('')

        const enable = computed(()=>{
            return (areEquals(psw1.value, psw2.value) && 
                amountCharacters(psw1.value,6) && 
                isAnEmail(email.value))
        })

        return {email, psw1, psw2, signUpEmail, enable, error, isAnEmail, areEquals};
    },
};
</script>
