import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import { Link, useRouter } from 'expo-router'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import { useSignup } from '../../hooks/useSignup'
import { Colors } from '../../constants/Colors'

const Register = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const { signup, isLoading, error } = useSignup()

  const router = useRouter()

  const handleSubmit = async () => {
    Keyboard.dismiss()
    await signup(email, password1, password2, name)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Register Your Account
        </ThemedText>
        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Password"
          value={password1}
          onChangeText={setPassword1}
          secureTextEntry
        />

        <ThemedTextInput
          style={{ width: '80%', marginBottom: 20 }}
          placeholder="Retype Password"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />

        <ThemedButton
          disabled={isLoading ? true : false}
          onPress={handleSubmit}
        >
          <Text style={{ color: '#f2f2f2' }}>
            {isLoading ? 'Registering...' : 'Register'}
          </Text>
        </ThemedButton>

        <Spacer height={20} />

        {error && <Text style={styles.error}>{error}</Text>}

        {/* <Link href={"../"} replace style={{marginBottom:20}}> <ThemedText>Back To Home</ThemedText> </Link>
          <Link href={"/login"} replace style={{marginBottom:20}}> <ThemedText>Login Instead</ThemedText> </Link> */}
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
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
