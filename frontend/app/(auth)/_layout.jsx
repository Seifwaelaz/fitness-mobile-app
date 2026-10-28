
import React from 'react'
// import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
import GuestOnly from '../../components/auth/GuestOnly'


const AuthLayout = () => {
  return (
    <>
        <GuestOnly>
          {/* <StatusBar value="auto"/> */}
          <Slot />
        </GuestOnly>
    </>
  )
}

export default AuthLayout