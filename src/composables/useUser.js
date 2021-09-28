//@ts-check
import { auth, firebase} from '../firebase'
import { useAuth } from '@vueuse/firebase'
import { useStore} from 'vuex'
import router from '../router/index'

export const useUser = () =>{

    const {user} = useAuth()
    const store = useStore()
    const err = {
        'auth/email-already-in-use': 'El usuario ya existe',
        'auth/user-not-found': 'El usuario no existe',
        'auth/wrong-password': 'Email o contraseña incorrecta'
    }

    const signInFacebook = () =>{
        const provider = new firebase.auth.FacebookAuthProvider()
        signIn(provider)
    }
    const signInGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider()
        signIn(provider)
    }

    const signIn = async (provider) =>{
        try {
            await firebase.auth().signInWithRedirect(provider)
            console.log(user)
            const objUser = {
                email: user.value.email,
                uid: user.value.uid
            }
            store.dispatch('setUser', objUser)
            router.push('/')

            store.dispatch('setError', null)
        } catch (error) {
            store.dispatch('setError', err[error.code])
        }
    }
    
    const signUpEmail = async (email, password) => {
        try {
            const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const objUser = {
                email: userCredentials.user.email,
                uid: userCredentials.user.uid
            }
            store.dispatch('setUser', objUser)
            router.push('/')

            store.dispatch('setError', null)
        } catch (error) {
            store.dispatch('setError', err[error.code])
        }
    }
    const signInEmail = async (email, password) =>{
        try {
            const userCredentials = await firebase.auth().signInWithEmailAndPassword(email, password)
            const objUser = {
                email: userCredentials.user.email,
                uid: userCredentials.user.uid
            }
            store.dispatch('setUser', objUser)
            router.push('/')
            
            store.dispatch('setError', null)
        } catch (error) {
            store.dispatch('setError', err[error.code])
        }
    }
    const keepUser = () =>{
        const objUser = {
            email: user.value.email,
            uid: user.value.uid
        }
        store.dispatch('setUser', objUser)
    }

    const signOut = async () =>{
        try {
            await auth.signOut()
            store.dispatch('setUser', null)
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return {signInGoogle, signInFacebook, signOut, signUpEmail, signInEmail, keepUser}
}