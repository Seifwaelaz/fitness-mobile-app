import { Stack } from 'expo-router'
import UserOnly from '../../components/auth/UserOnly'
import { useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors'

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <UserOnly>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ title: '' }} />
        <Stack.Screen name="workouts" options={{ title: '' }} />
      </Stack>
    </UserOnly>
  )
}
