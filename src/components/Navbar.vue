<template>
    <div class="d-flex justify-content-start" v-if="user">
        <router-link to="/" class="btn btn-light text-primary mx-1" >
            Inicio
        </router-link>
        <router-link to="/adding" class="btn btn-light text-primary mx-1 ">
            Agregar
        </router-link>
    </div>

    <button
        class="btn btn-light text-primary text-danger  "
        @click="signOut"
        v-if="user"
    >
        Cerrar Sesión
    </button>
    <div class="d-flex justify-content-end" v-if="!user">
        <router-link to="/login" class="btn btn-light text-primary  mx-1" >
            Ingresar
        </router-link>
        <router-link
            to="/registration"
            class="btn btn-light text-primary  mx-1"
        >
            Registrarse
        </router-link>
    </div>
    
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useUser } from "../composables/useUser";
import { useAuth } from "@vueuse/firebase";
export default {
    setup() {
        const store = useStore();
        const { signOut } = useUser();
        const { user } = useAuth();

        return { signOut, user };
    },
};
</script>