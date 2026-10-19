import { useState } from "react"
import { useWorkoutsContext } from "./useWorkoutsContext"
import { useUserContext } from "./useUserContext"
import { useRouter } from "expo-router"
import { useLogout } from './useLogout'


export const useWorkouts = () => {


    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [createFlag, setCreateFlag] = useState(false)
    const [deleteFlag, setDeleteFlag] = useState(false)
    const {dispatch} = useWorkoutsContext()
    const {user} = useUserContext()
    const router = useRouter()
    const { logout } = useLogout()

    const handleUnauthorized = async (response) => {
        if (response.status !== 401) {
            return false
        }

        await logout()
        return true
    }

    const getWorkouts = async () => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/workouts/`, {
                headers: { 'Authorization' : `Bearer ${user.token}`}
            })

            if (await handleUnauthorized(response)) {
                return
            }
            const json = await response.json()

            if(!response.ok)
            {
                setError(json.error)
                return
            }

            if(response.ok)
            {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        catch (error) {
            setError('Could not connect to the server. Please try again.')
        } finally {
            setIsLoading(false)
        }

    }

    const getWorkout = async (id) => {

        setIsLoading(true)
        setError(null)

        try{

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/workouts/${id}`, {
                headers: {'Authorization' : `Bearer ${user.token}`}
            })

            if (await handleUnauthorized(response)) {
                return
            }

            const json = await response.json()

            if(!response.ok)
            {
                setError(json.error)
                return
            }

            if(response.ok)
            {
                return json
            }
        }
        catch (error) {
            setError('Could not connect to the server. Please try again.')
        } finally {
            setIsLoading(false)
        }

    }

    const createWorkout = async (title, load, reps, sets) => {
        setIsLoading(true)
        setError(null)
        setCreateFlag(false)


        if(!title.trim() || !reps.trim() || !load.trim() || !sets.trim())
        {
            setError("Please fill in all the fields")
            setIsLoading(false)
            return
        }
        try{
            const workout = {title,load,reps, sets}

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/workouts/`, {
                method: 'POST',
                headers: {'Authorization' : `Bearer ${user.token}`,
                        'Content-Type' : 'application/json'},
                body: JSON.stringify(workout)
            })

            if (await handleUnauthorized(response)) {
                return
            }

            const json = await response.json()

            if(!response.ok)
            {
                setError(json.error)
                return
            }

            if(response.ok)
            {
                dispatch({type: 'CREATE_WORKOUT', payload: json})
                setCreateFlag(true)
                router.replace('/workouts')
            }
        }
        catch (error) {
            setError('Could not connect to the server. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const deleteWorkout = async (id) => {
        setError(null)
        setIsLoading(true)
        setDeleteFlag(false)

        try{

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/workouts/${id}`, {
                method: 'DELETE',
                headers: {'Authorization' : `Bearer ${user.token}`}
            })

            if (await handleUnauthorized(response)) {
                return
            }

            const json = await response.json()

            if(!response.ok)
            {
                setError(json.error)
                return
            }

            if(response.ok)
            {
                dispatch({type: 'DELETE_WORKOUT', payload: json})
                setDeleteFlag(true)
                router.replace("/workouts")
            }
        }
        catch (error) {
            setError('Could not connect to the server. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const updateWorkout = async (id, title, load, reps, sets) => {
    setError(null)
    setIsLoading(true)

    try{

        const workout = {title, load, reps, sets}

        const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/workouts/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(workout)
            }
        )

        if (await handleUnauthorized(response)) {
            return
        }

        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
            return
        }

        if(response.ok)
        {
            return json
        }
    }
    catch (error)
    {
        setError('Could not connect to the server. Please try again.')
    }
    finally
    {
        setIsLoading(false)
    }
}

    return { isLoading, error, setError, getWorkout, getWorkouts, deleteWorkout, createWorkout, updateWorkout, createFlag, setCreateFlag, deleteFlag}
}