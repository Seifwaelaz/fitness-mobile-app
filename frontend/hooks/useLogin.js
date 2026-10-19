import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { useUserContext } from "./useUserContext"
import { useRouter } from "expo-router"

export const useLogin = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useUserContext()
    const router = useRouter()

    const login = async (email, password) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
            return
        }
        if(response.ok){
            await AsyncStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
            router.dismiss()
            //router.replace('/workouts')
        }


    }

    return {login, isLoading, error}
}