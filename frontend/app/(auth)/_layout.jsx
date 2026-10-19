import {useColorScheme} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import GuestOnly from '../../components/auth/GuestOnly'


const AuthLayout = () => {
  return (
    <>
        <GuestOnly>
          <StatusBar value="auto"/>
          <Stack>
            <Stack.Screen name='login' options={{headerShown: false, title: 'login'}}/>
            <Stack.Screen name='register' options={{headerShown: false ,title: 'Register your Account'}}/>
          </Stack>
        </GuestOnly>
    </>
  )
}

export default AuthLayout