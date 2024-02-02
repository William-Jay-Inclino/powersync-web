import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from './types'

export const useAuthStore = defineStore('auth', () => {
    //state
    const currentUser:User = {
        username: 'devjay',
        email: 'william@leyeco.com',
        firstname: 'William Jay',
        lastname: 'Inclino',
        password: 'test1234'
    }
    const isLoggedIn = ref(false)
  
    //actions
    function authenticateUser(user:User){
        if (user) {
            if (!user.username) {
                console.error("Username is undefined")
                return false
            }
            if (!user.password) {
                console.error("User password is undefined")
                return false
            }

            if (user.username === currentUser.username && user.password === currentUser.password) {
                isLoggedIn.value = true
                return true
            }
            return false
        }
        return false
    }

    function logoutUser() {
        isLoggedIn.value = false
    }

    return {
        //state
        isLoggedIn,
        currentUser,
        //method
        authenticateUser,
        logoutUser
    }
})