import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useUserContext } from './useUserContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
  const { dispatch } = useUserContext()
  const { dispatch: workoutsDispatch } = useWorkoutsContext()
  const [isLoading, setIsLoading] = useState(false)

  const logout = async () => {
    setIsLoading(true)
    try {
      await AsyncStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    } finally {
      setIsLoading(false)
    }
  }

  return { logout, isLoading }
}
