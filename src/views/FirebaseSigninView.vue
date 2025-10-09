<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"/></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase</button></p>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth' // the function name

const router = useRouter()        // name uniform
const email = ref('')
const password = ref('')
const auth = getAuth()

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value) 
    console.log('Firebase Register successful!')
    router.push('/FireLogin')  
  } catch (err) {
    console.log(err.code, err.message)
  }
}
</script>
