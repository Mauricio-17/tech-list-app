<template>
    <div id="app">
        <nav class="container-fluid navbar navbar-dark bg-primary " >
          <Navbar />
        </nav>
        <router-view/>
        
    </div>
</template>

<script>
//@ts-check
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import {firebase} from './firebase'
import { useUser } from './composables/useUser'
export default {
  components:{
    Navbar
  },
  setup(){
    const {keepUser} = useUser()
    onMounted(async ()=>{
      if(await firebase.getCurrentUser()){
        keepUser()
      }
    })
  }

}
</script>

<style>
</style>