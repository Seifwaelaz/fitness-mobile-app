import { Image, useColorScheme } from 'react-native'

import DarkModeLogo from '../assets/lift_logo_dark_mode.png'
import LightModeLogo from '../assets/lift_logo_light_mode.png'

const ThemedLogo = ({ style }) => {
  const colorScheme = useColorScheme()

  const logo = colorScheme === 'dark' ? DarkModeLogo : LightModeLogo
  return <Image source={logo} style={style} />
}

export default ThemedLogo
