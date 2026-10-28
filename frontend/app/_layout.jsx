import { StyleSheet, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../constants/Colors'
import { Stack } from 'expo-router'
import { UserContextProvider } from '../contexts/UserContext'
import { WorkoutsContextProvider } from '../contexts/WorkoutsContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <UserContextProvider>
      <WorkoutsContextProvider>
        {/* <GestureHandlerRootView style={{flex: 1}}> */}
        <StatusBar value="auto" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen name="(auth)" options={{ title: 'Authentication' }} />
          <Stack.Screen name="index" options={{ title: '' }} />
          <Stack.Screen
            name="(dashboard)"
            options={{ title: '', headerShown: false }}
          />
        </Stack>
        {/* </GestureHandlerRootView> */}
      </WorkoutsContextProvider>
    </UserContextProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})
