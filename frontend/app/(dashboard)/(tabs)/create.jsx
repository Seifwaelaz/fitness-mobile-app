import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../../components/ThemedView'
import ThemedText from '../../../components/ThemedText'
import Spacer from '../../../components/Spacer'
import ThemedTextInput from '../../../components/ThemedTextInput'
import ThemedButton from '../../../components/ThemedButton'
import { useWorkouts } from '../../../hooks/useWorkouts'
import { Colors } from '../../../constants/Colors'

const create = () => {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const { isLoading, error, createWorkout, createFlag } = useWorkouts()

  useEffect(() => {
    if (createFlag) {
      setTitle('')
      setLoad('')
      setReps('')
      setSets('')
      //setCreateFlag(false)
    }
  }, [createFlag])

  const handleSubmit = async () => {
    await createWorkout(title, load, reps, sets)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.heading}>
          Add a New Workout
        </ThemedText>

        <Spacer />

        <ThemedTextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Load"
          value={load}
          onChangeText={setLoad}
          style={styles.input}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Sets"
          value={sets}
          onChangeText={setSets}
          style={styles.input}
        />

        <Spacer />

        <ThemedTextInput
          placeholder="Reps"
          value={reps}
          onChangeText={setReps}
          style={styles.input}
        />

        <Spacer />

        <ThemedButton onPress={handleSubmit} disabled={isLoading}>
          <Text style={{ color: '#fff' }}>
            {isLoading ? 'Saving...' : 'Create Workout'}
          </Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}> {error}</Text>}
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    padding: 20,
    borderRadius: 6,
    alignSelf: 'stretch',
    marginHorizontal: 40,
  },
  error: {
    color: Colors.warning,
    padding: 10,
    // backgroundColor: '#f5c1c8',
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
})
