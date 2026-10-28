import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import { Link } from 'expo-router'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import { useLogin } from '../../hooks/useLogin'
import { Colors } from '../../constants/Colors'
import { useUserContext } from '../../hooks/useUserContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isLoading } = useLogin()

  const handleSubmit = async () => {
    Keyboard.dismiss()
    await login(email, password)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        <ThemedText title style={styles.title}>
          Login to Your Account
        </ThemedText>
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <ThemedButton
          disabled={isLoading ? true : false}
          onPress={handleSubmit}
        >
          <Text style={{ color: '#f7f3f3', fontWeight: 'bold', fontSize: 14 }}>
            {isLoading ? 'Logging In...' : 'Login'}
          </Text>
        </ThemedButton>

        <Spacer height={15} />

        {/* <Link href={"/register"} replace style={{marginBottom:20}}> <ThemedText style={{color: 'white'}}>Register Instead?</ThemedText> </Link> */}

        <Spacer height={10} />
        {error && <Text style={styles.error}> {error}</Text>}

        {/* <Link href={"/"} replace style={{marginBottom:20}}> <ThemedText>Back To Home</ThemedText> </Link> */}
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Login

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
