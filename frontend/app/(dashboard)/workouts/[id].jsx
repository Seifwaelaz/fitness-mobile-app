import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedCard from '../../../components/ThemedCard'
import ThemedButton from '../../../components/ThemedButton'
import { useWorkouts } from '../../../hooks/useWorkouts'
import ThemedText from '../../../components/ThemedText'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ThemedView from '../../../components/ThemedView'
import ThemedLoader from '../../../components/ThemedLoader'
import Spacer from '../../../components/Spacer'
import { Colors } from '../../../constants/Colors'
// import { Ionicons } from '@expo/vector-icons'
// import { Gesture, GestureDetector } from 'react-native-gesture-handler'
// import { scheduleOnRN } from 'react-native-worklets'
import { useWorkoutsContext } from '../../../hooks/useWorkoutsContext'



const WorkoutDetails = () => {

    const {isLoading, getWorkout, deleteWorkout, error} = useWorkouts()
    const [workout, setWorkout] = useState(null)
    const {id} = useLocalSearchParams()
    const {deleteFlag} = useWorkouts()
    const router = useRouter()
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const {workouts} = useWorkoutsContext()

    const loadWorkout = async () => {
        const w = await getWorkout(id)
        if(w) {
            setWorkout(w)
        }
    }

    useEffect(()=> {
        loadWorkout()

        return ()=> setWorkout(null)
    }, [id, workouts])

    useEffect(()=> {
        if(deleteFlag)
        {
            setWorkout(null)
        }
    }, [deleteFlag])

    const handlePress = async () => {
        Alert.alert(
            'Remove workout',
            'Are you sure you want to remove your workout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {await deleteWorkout(id)}
                }
            ])
    }

    if(!workout){
        return(
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

    // const redirectBack = () => {
    //     router.replace('/workouts')
    // }

    // const backGesture = Gesture.Pan().onEnd((event) => {
    //         if(event.translationX > 25 )
    //             {
    //                 scheduleOnRN(redirectBack)
    //             }
    //     }
    // )

  return (
    //<GestureDetector gesture={backGesture}>
        <ThemedView safe={true} style={styles.container}>
            {/* <Pressable onPress={()=> router.back()} style={({pressed})=> [styles.backButton, {opacity: pressed? 0.5 : 1}]}>
                <Ionicons name='chevron-back' size={24} color={theme.iconColorFocused}/>
                <ThemedText style={styles.backText}>Back</ThemedText>
            </Pressable> */}

            <ThemedText title={true} style={styles.heading}>
                Workout Details
            </ThemedText>

            <Spacer />
            
            <ThemedCard style={styles.card}>
                <ThemedText title={true} style={styles.title}>{workout.title}</ThemedText>
                <Spacer height={10}/>
                <ThemedText>Load: {workout.load}</ThemedText>
                <ThemedText>Sets: {workout.sets}</ThemedText>
                <ThemedText>Reps: {workout.reps}</ThemedText>
            </ThemedCard>
            <ThemedButton onPress={() => router.push(`/workouts/${id}/edit`)} style={styles.edit}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                    Edit Workout
                </Text>
            </ThemedButton>
            <ThemedButton onPress={handlePress} style={styles.delete} disabled={isLoading}>
                <Text style={{color: '#fff', textAlign: 'center'}}>{isLoading? "Deleting..." : "Delete Workout"}</Text>
            </ThemedButton>
        </ThemedView>
    //</GestureDetector>
  )
}

export default WorkoutDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20
  },
  delete: {
    marginTop: 10,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
  edit: {
    marginTop: 40,
    backgroundColor: '#4c4c4a',
    width: 200,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  backText: {
    fontSize: 17,
  },
  heading: {
        fontSize: 30,
        alignSelf: 'center',
    }
})