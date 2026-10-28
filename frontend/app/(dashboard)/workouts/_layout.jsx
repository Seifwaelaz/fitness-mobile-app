import React from 'react'
import { Stack } from 'expo-router'

export default function WorkoutStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="[id]/edit" />
    </Stack>
  )
}
