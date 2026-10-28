import { useEffect } from 'react'
import ThemedLoader from '../ThemedLoader'
import { useRouter } from 'expo-router'
import { useUserContext } from '../../hooks/useUserContext'

const UserOnly = ({ children }) => {
  const router = useRouter()
  const { user, authChecked } = useUserContext()

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace('/')
    }
  }, [user, authChecked])

  if (!authChecked || !user) {
    return <ThemedLoader />
  }

  return children
}

export default UserOnly
