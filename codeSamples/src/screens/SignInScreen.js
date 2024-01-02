import { View, Text } from 'react-native'
import React from 'react'
import {SingIn as SingIn} from '../features'

const SignInScreen = (props) => {
  return (
   <SingIn props={props}/>
  )
}

export default SignInScreen;