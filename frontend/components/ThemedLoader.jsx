import { ActivityIndicator, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedView from './ThemedView'
import { Colors } from '../constants/Colors'

const ThemedLoader = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <ThemedView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <ActivityIndicator size={"large"} color={theme.text}/>
    </ThemedView>
  )
}

export default ThemedLoader