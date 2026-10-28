import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useUserContext } from './useUserContext'
import { useRouter } from 'expo-router'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useUserContext()
  const router = useRouter()

  const signup = async (email, password1, password2, name) => {
    setError(null)
    setIsLoading(true)

    if (password1 !== password2) {
      setIsLoading(false)
      setError('Passwords do not match')
      return
    }
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/user/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: password1, name }),
      },
    )

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      return
    }

    if (response.ok) {
      await AsyncStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })
      setIsLoading(false)
      router.dismiss()
      //router.replace('/workouts')
    }
  }

  return { signup, error, isLoading }
}
