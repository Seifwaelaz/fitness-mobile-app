import { useRouter } from 'expo-router'
import ThemedLoader from '../ThemedLoader'
import { useUserContext } from '../../hooks/useUserContext'
import { useEffect } from 'react'

const GuestOnly = ({ children }) => {
  const router = useRouter()
  const { user, authChecked } = useUserContext()

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace('/profile')
    }
  }, [authChecked, user])

  if (!authChecked || user) {
    return <ThemedLoader />
  }

  return children
}

export default GuestOnly
