import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import ThemedView from '../../../components/ThemedView'
import ThemedText from '../../../components/ThemedText'
import { Link, useRouter } from 'expo-router'
import Spacer from '../../../components/Spacer'
import { useWorkoutsContext } from '../../../hooks/useWorkoutsContext'
import ThemedCard from '../../../components/ThemedCard'
import { Colors } from '../../../constants/Colors'
import { useEffect } from 'react'
import { useWorkouts } from '../../../hooks/useWorkouts'
import { useUserContext } from '../../../hooks/useUserContext'
import ThemedLoader from '../../../components/ThemedLoader'



const Workouts = () => {

  const {workouts, dispatch} = useWorkoutsContext()
  const router = useRouter()
  const {user} = useUserContext()
  const {getWorkouts} = useWorkouts()

  useEffect(()=> {
    if(user)
    {
      getWorkouts()
    }
  },[user])

   if(!workouts){
          return(
              <ThemedView safe={true} style={styles.container}>
                  <ThemedLoader/>
              </ThemedView>
          )
    }

  return (
    <ThemedView style={styles.container} safe={true}>

      <ThemedText title style={styles.heading}>Your Workouts</ThemedText>
      <Spacer height={20}/>

      <FlatList
        data={workouts}
        keyExtractor={(w) => w._id}
        contentContainerStyle={styles.list}
        renderItem={({item})=> (
          <Pressable onPress={() => router.push(`/workouts/${item._id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Load:   {item.load} KG</ThemedText>
              <ThemedText>Sets:    {item.sets} Sets</ThemedText>
              <ThemedText>Reps:   {item.reps} Reps</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  )
}

export default Workouts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    // marginTop: 30,
    width: "450%"
  },
  card: {
    // width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  }
})