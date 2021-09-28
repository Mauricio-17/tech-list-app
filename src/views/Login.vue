<template>
    <div class="container ">
        <div class="row justify-content-center">
            <h2 class="text-primary text-center fw-bold my-4 col col-md-7"
            >
                Inicio de sesión
            </h2>
        </div>
        <div class="row justify-content-center">
            <form @submit.prevent="signInEmail(email, password)" class="col col-md-7">
                <input type="email" v-model.trim="email" class="form-control my-3" placeholder="Ingrese email">
                <input type="password" v-model.trim="password" class="form-control my-3" placeholder="Ingrese contraseña">
                <!-- ERROR -->
                <p v-if="error" class="text-danger">{{error}}</p>
                <button type="submit" class="btn btn-primary mt-3 w-100" :disabled="!enabled">
                    Ingresar
                </button>
                <button @click="signInGoogle" class="btn btn-warning w-100 my-1">
                    O ingresar con Google
                    <i class="bi bi-google mx-2"></i>
                </button>
            </form>
        </div>
        
    </div>
</template>

<script>
//@ts-check
import { useUser } from '../composables/useUser'
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
import { validate } from '../validate';

export default {
    setup() {
        const {signInGoogle, signInEmail} = useUser()
        const { isAnEmail, amountCharacters} = validate()
        const store = useStore()

        const error = computed(()=>(
            store.state.error
        ))

        let email = ref('')
        let password = ref('')

        const enabled = computed(()=>(
            isAnEmail(email.value) && amountCharacters(password.value, 6)
        ))

        return {signInGoogle, signInEmail, email, password, enabled, error};
    },
};
</script>

<style scoped>

</style>