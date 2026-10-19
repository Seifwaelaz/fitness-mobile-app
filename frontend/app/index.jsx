import { StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native'

import ThemedLogo from '../components/ThemedLogo'
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import { Colors } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { useUserContext } from '../hooks/useUserContext'
import { useEffect } from 'react'
import { useLogout } from '../hooks/useLogout'
import ThemedLoader from '../components/ThemedLoader'

const Landing = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const {user, authChecked} = useUserContext()
  const router = useRouter()
  const {isLoading} = useLogout()

  useEffect(()=> {
    if(authChecked && user)
  {
    router.replace('/profile')
  }
  }, [user,authChecked])

  if(!authChecked || user)
  {
    return (
      <ThemedLoader/>
    )
  }

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedLogo style={styles.logo}/>

      <ThemedText title= {true} style={styles.tagline}>
        Family, Fitness and Lifestyle{"\n"}
        <ThemedText title= {true} style={{fontWeight:"700"}}>
          in that order!{" "}
        </ThemedText>
      </ThemedText>

      {/* ---------- Buttons ---------- */}

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>
          <Ionicons name='logo-google' size={23} color={'#000000'} />
          {"  "}Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton}>
        <Text style={styles.appleText}>
          <Ionicons name='logo-apple' size={24} color={'#FFFFFF'}/>
          {"  "}Continue with Apple
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.emailButton}>
        <Text style={[styles.emailText, {color : colorScheme === 'dark' ? '#FFFFFF' : '#000000'}]}>
          <Ionicons name='mail' size={20} color={colorScheme === 'dark'? '#FFFFFF' : '#000000'}/>
          {"  "}<Link href={"/register"}>Continue with Email</Link>
        </Text>
      </TouchableOpacity>

      <Text style={[styles.login, {color: colorScheme === 'dark'? '#FFFFFF' : "#625f72" }]}>
        Already have an account?
        <Text style={{fontWeight:"700"}}>
          {" "} <Link href={"/login"} >Log in</Link>
        </Text>
      </Text>

    </ThemedView>
  )

}

export default Landing

const styles = StyleSheet.create({
    container:{
    flex:1,
  },

  logo:{
    height:150,
    width: 200,
    alignSelf: "center"
  },

  tagline:{
    textAlign:"center",
    fontSize:18,
    lineHeight:30,
    marginTop:10,
    marginHorizontal:30,
    marginBottom:35,
  },

  googleButton:{
    backgroundColor:"#fff",
    marginHorizontal:25,
    height:58,
    borderRadius:18,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:14,

    borderWidth:1.2,

    borderColor:"#DDD",

    elevation:4,
  },

  googleText:{
    fontSize:17,
    fontWeight:"600",
  },

  appleButton:{
    backgroundColor:"#111",
    marginHorizontal:25,
    height:58,
    borderRadius:18,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:14,
  },

  appleText:{
    color:"white",
    fontWeight:"600",
    fontSize:17,
  },

  emailButton:{
    height:58,

    borderRadius:18,

    borderWidth:1.2,

    borderColor:"#DDD",

    marginHorizontal:25,

    justifyContent:"center",

    alignItems:"center",

    marginBottom:20,
  },

  emailText:{
    fontSize:17,
    fontWeight:"600",
  },

  login:{
    textAlign:"center",
    fontSize:15,
  }
})