import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedText = ({ style, title = false, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <Text
      style={[{ color: title ? theme.title : theme.text }, style]}
      {...props}
    />
  )
}

export default ThemedText

const styles = StyleSheet.create({})
