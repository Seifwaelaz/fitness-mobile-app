import { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useWorkouts } from '../../../../hooks/useWorkouts'
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import ThemedView from '../../../../components/ThemedView'
import ThemedText from '../../../../components/ThemedText'
import ThemedTextInput from '../../../../components/ThemedTextInput'
import ThemedButton from '../../../../components/ThemedButton'
import Spacer from '../../../../components/Spacer'
import { useWorkoutsContext } from '../../../../hooks/useWorkoutsContext'
import ThemedLoader from '../../../../components/ThemedLoader'

const EditWorkout = () => {

    const { id } = useLocalSearchParams()
    const { getWorkout, updateWorkout, isLoading, error, setError } = useWorkouts()

    const [workout, setWorkout] = useState(null)
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [sets, setSets] = useState('')

    const { dispatch } = useWorkoutsContext()
    const router = useRouter()


    const handleSubmit = async () => {
        if (isLoading) {
            return
        }
        if (!title.trim() || !load.trim() || !reps.trim() || !sets.trim()) {
            setError('Please fill in all fields.')
            return
        }

        if (
            !Number.isFinite(Number(load)) ||
            !Number.isInteger(Number(reps)) ||
            !Number.isInteger(Number(sets)) ||
            Number(load) < 0 ||
            Number(reps) <= 0 ||
            Number(sets) <= 0
        )
        {
            setError('Enter a valid load, and positive whole numbers for reps and sets.')
            return
        }

        const updatedWorkout = await updateWorkout(id, title, load, reps, sets)

        if(updatedWorkout)
        {
            dispatch({type: "UPDATE_WORKOUT", payload: updatedWorkout})
            //console.log('Workout updated:', updatedWorkout)

            router.back()
        }
    }

    useEffect(() => {

        const loadWorkout = async () => {
            const w = await getWorkout(id)

            if (!w) {
            return
            }

            setWorkout(w)
            setTitle(w.title)
            setLoad(String(w.load))
            setReps(String(w.reps))
            setSets(String(w.sets))
        }

        loadWorkout()

    }, [id])

    if (!workout) {
        return (
            <ThemedView safe={true} style={styles.container}>
            {isLoading ?
                <ThemedLoader />
             :
                <ThemedText>
                    {error || 'Could not load this workout.'}
                </ThemedText>
            }
            </ThemedView>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ThemedView safe={true} style={styles.container}>

        <ThemedText title={true} style={styles.heading}>
            Edit Workout
        </ThemedText>

        <Spacer />

        <ThemedText title style={{alignSelf: 'center', marginBottom: 5}}>
            Title
        </ThemedText>

        <ThemedTextInput
            placeholder="Title"
            value={title}
            onChangeText={(value) => {
                setTitle(value)
                setError(null)
            }}
            style={{textAlign: 'center'}}
        />

        <Spacer />

        <ThemedText title style={{alignSelf: 'center', marginBottom: 5}}>
            Load
        </ThemedText>

        <ThemedTextInput
            placeholder="Load"
            value={load}
            onChangeText={(value) => {
                setLoad(value)
                setError(null)
            }}
            style={{textAlign: 'center'}}
        />

        <Spacer />

       <ThemedText title style={{alignSelf: 'center', marginBottom: 5}}>
            Sets
        </ThemedText>

        <ThemedTextInput
            placeholder="Sets"
            value={sets}
            onChangeText={(value) => {
                setSets(value)
                setError(null)
            }}
            style={{textAlign: 'center'}}
        />

        <Spacer />

        <ThemedText title style={{alignSelf: 'center', marginBottom: 5}}>
            Reps
        </ThemedText>

         <ThemedTextInput
            placeholder="Reps"
            value={reps}
            onChangeText={(value) => {
                setReps(value)
                setError(null)
            }}
            style={{textAlign: 'center'}}
        />

        

        <Spacer />

        <ThemedButton onPress={handleSubmit} style={styles.save} disabled={isLoading}>
            <Text style={{color: '#fff', textAlign: 'center'}}>
                {isLoading ? 'Saving...' : 'Save Changes'}
            </Text>
        </ThemedButton>

        {error &&
            <Text style={styles.error}>
                {error}
            </Text>
        }

    </ThemedView>
    </TouchableWithoutFeedback>
)
}

export default EditWorkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    heading: {
        fontSize: 30,
        alignSelf: 'center',
    },
    save: {
    marginTop: 10,
    backgroundColor: '#060606',
    width: 200,
    alignSelf: "center",
  },
    error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
}
})