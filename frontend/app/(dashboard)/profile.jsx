import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, useColorScheme} from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import { useLogout } from '../../hooks/useLogout'
import { useUserContext } from '../../hooks/useUserContext'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { File } from 'expo-file-system'
import { Colors } from '../../constants/Colors'

const profile = () => {

  const {logout, isLoading} = useLogout()
  const {user, dispatch} = useUserContext()
  const [isLoading2, setIsLoading2] = useState(false)
  const [isLoading3, setIsLoading3] = useState(false)
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light


  const [error, setError] = useState(null)


  const handleLogoutButton = async () => {
    await logout()
  }

  const uploadImage = async (imageUri) => {
    setError(null)
    setIsLoading2(true)

    const file = new File(imageUri)

    const formData = new FormData()

    formData.append('profilePicture', file)

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/profile-picture`, {
    method: 'PATCH',
    headers: {
        Authorization: `Bearer ${user.token}`
    },
    body: formData
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading2(false)
      return
    }

    if(response.ok)
    {
      dispatch({type: 'UPDATE_PROFILE', payload: json})
      const updatedUser = {
        ...user,
        ...json
      }

      await AsyncStorage.setItem('user', JSON.stringify(updatedUser))
      setIsLoading2(false)
    }
  }

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const imageUri = result.assets[0].uri
      await uploadImage(imageUri)
    }
  }

  const handleRemoveImage = async () => {

  Alert.alert(
    'Remove profile picture',
    'Are you sure you want to remove your profile picture?',
    [
        {
            text: 'Cancel',
            style: 'cancel'
        },
        {
            text: 'Remove',
            style: 'destructive',
            onPress: async () => {


        setError(null)
        setIsLoading3(true)

        const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/user/profile-picture`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        )

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading3(false)
            return
        }

        if(response.ok)
        {
          await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                  ...user,
                  ...json
              })
          )

          dispatch({
              type: 'UPDATE_PROFILE',
              payload: json
          })
          setIsLoading3(false)
        }

                    }
                }
      ]
  )
}

  return (
    <ThemedView style={styles.container}>
      <Pressable onPress={handlePickImage}>
        {isLoading2? ( <ActivityIndicator size={'large'}/> ) : user.profilePicture? (
          <Image
            source={{uri: user.profilePicture}}
            style={styles.profileImage}
          />
        ): (
              <ThemedView style={styles.profilePlaceholder}>

                <ThemedText style={styles.cameraIcon}>📷</ThemedText>

              </ThemedView>
        )}
      </Pressable>

      <ThemedText title style={[styles.header, {fontSize: 35}]}>
        {user? user.name : "name"}
      </ThemedText>
      <Spacer height={2}/>
      <ThemedText style={styles.header}>
        {user? user.email : "email"}
      </ThemedText>
      <Spacer height={30}/>



          {isLoading3?
            <ThemedButton onPress={handleRemoveImage} style={styles.removeButton}>
              <Text style={styles.removeButtonText}> Removing Image... </Text>
            </ThemedButton>
            :  user.profilePicture? <>
              <ThemedButton onPress={handlePickImage} style={styles.changeButton}>
                <Text style={styles.changeButtonText}>Change Profile Picture</Text>
              </ThemedButton>
              <ThemedButton onPress={handleRemoveImage} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove Profile Picture</Text>
              </ThemedButton>
              </>
              :
              <Text style={{color: theme.background}}>.</Text>
          }





      <ThemedButton disabled={isLoading} onPress={handleLogoutButton}>
        <Text style={{color: "#f2f2f2"}}>{isLoading? "Logging Out.." : "Logout"}</Text>
      </ThemedButton>
      {error && <Text style={styles.error}> {error}</Text>}
    </ThemedView>
  )
}

export default profile

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65
  },

  profilePlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0000'
  },

  cameraIcon: {
    fontSize: 35
  },
  error: {
      color: Colors.warning,
      padding: 10,
      backgroundColor: '#f5c1c8',
      borderColor: Colors.warning,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 10,
  },
  removeButton: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: '#ae4956'
  },
  removeButtonText: {
      fontSize: 14,
      color: 'white'
  },
  changeButton: {
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: '#5b5859'
  },
  changeButtonText: {
      fontSize: 14,
      color: 'white'
  }
})