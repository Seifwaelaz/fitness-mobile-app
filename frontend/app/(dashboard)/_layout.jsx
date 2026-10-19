import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import UserOnly from '../../components/auth/UserOnly'
import ThemedText from '../../components/ThemedText'

const DashboardLayout = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

  return (
    <UserOnly>
      <Tabs screenOptions={{headerShown: false,
      tabBarActiveTintColor: theme.iconColorFocused,
      tabBarInactiveTintColor: theme.iconColor,
      tabBarStyle: {
          height: 90,
          paddingTop: 10,
          backgroundColor: theme.navBackground,
          borderColor: 'black'
      }
      }}>
          <Tabs.Screen name='create' options={{title: 'create', tabBarIcon : ({focused}) => (
            <Ionicons size={24} name={focused? 'create' : 'create-outline'} color={focused? theme.iconColorFocused : theme.iconColor}/>
          )}}/>
          <Tabs.Screen name='workouts' options={{title: 'workouts', tabBarIcon : ({focused}) => (
            <MaterialCommunityIcons size={24} name={focused? 'weight-lifter': 'dumbbell'} color={focused? theme.iconColorFocused : theme.iconColor}/>
          )}}/>
          <Tabs.Screen name='profile' options={{title: 'profile', tabBarIcon : ({focused}) => (
            <Ionicons size={24} name={focused? 'person' : 'person-outline'} color={focused? theme.iconColorFocused : theme.iconColor}/>
          )}}/>
          <Tabs.Screen name='workouts/[id]' options={{href: null}}/>
          <Tabs.Screen name='workouts/[id]/edit' options={{href: null}}/>
      </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout