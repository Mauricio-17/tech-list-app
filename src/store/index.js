// @ts-check
import { createStore } from 'vuex'
import {db} from '../firebase'
import { useAuth } from '@vueuse/firebase'
import route from '../router/index'

export default createStore({
    state:{
        user: null,
        technologies: [],
        technology:{
            id: '',
            name: '',
            description: '',
            knowledge: ''
        },
        techsFiltered:[],

        error: '',
        lock: false,
        loading: false
    },
    mutations:{
        setTechnologies(state, payload){
            state.technologies = payload
        },
        setTechnology(state, payload){
            state.technologies.push(payload)
            state.techsFiltered.push(payload)
        },
        setTechsFiltered(state, payload){
            state.techsFiltered = payload
        },
        removeTechnology(state, payload){
            state.technologies = state.technologies.filter(item => item.id !== payload.id)
            state.techsFiltered = state.techsFiltered.filter(item => item.id !== payload.id)
        },
        updateTechnology(state, payload){
            state.technologies = state.technologies.map(item => item.id === payload.id ? payload : item)
        },
        setTech(state, payload){
            state.technology = payload
        },
        
        // --------------- USER ------------------------------
        setUser(state, payload){
            state.user = payload
        },
        //-------- ERROR -----------
        setError(state, payload){
            state.error = payload
        },
        // ------- LOCK && LOADING ----------------------
        setLock(state, payload){
            state.lock = payload
        },
        setLoading(state, payload){
            state.loading = payload
        }

    },
    actions:{

        getTechnologies({commit, state}){

            commit('setLoading', true)
            db.collection(state.user.email).get()
            .then(res=>{
                let data = []
                res.forEach(doc =>{
                    let item = doc.data()
                    item.id = doc.id
                    data.push(item)
                })
                commit('setTechnologies', data)
                commit('setTechsFiltered', data)
            }).catch(error => {
                console.log(error)
            })
            .finally(() =>{
                commit('setLoading', false)
            })
        },
        addTechnology({commit, state}, item){

            commit('setLock', true)
            db.collection(state.user.email).add(item)
            .then(doc =>{
                console.log(doc)
                item.id = doc.id
                commit('setTechnology', item)
                route.push('/')
            })
            .catch(error =>{
                console.log(error)
            }).finally(()=>{
                commit('setLock', false)
            })
        },
        deleteTechnology({commit, state}, item){
            
            commit('setLock', true)
            db.collection(state.user.email).doc(item.id).delete()
            .then(() => {
                console.log('deleted')
            }).catch(error =>{
                console.log(error)
            }).finally(() => {
                commit('setLock', false)
            })
            
        },
        updateTechnology({commit, state}, item){

            commit('setLock', true)
            db.collection(state.user.email).doc(item.id)
            .update({
                description: item.description,
                knowledge: item.knowledge
            }).then(()=>{
                console.log('edited')
                commit('updateTechnology', item)
                route.push('/')
            }).catch(error =>{
                console.log(error)
            }).finally(() =>{
                commit('setLock', false)
            })
        },
        setTechnology({commit}, tech){
            commit('setTech', tech)
        },

        techsFiltered({commit, state}, word){
            word = word.toLowerCase()
            let filtered = state.technologies.filter(item=>{
                let name = item.name.toLowerCase()
                if (name.includes(word)) return item
            })
            commit('setTechsFiltered', filtered)
        },
        //-------- USER ------------------

        setUser({commit}, user){
            commit('setUser', user)
        },
        // --------- ERROR -----------
        setError({commit}, error){
            commit('setError', error)
        },
    },
    getters:{
        userExists(state){
            return !!state.user
        },
    },
    modules:{
        
    }


})