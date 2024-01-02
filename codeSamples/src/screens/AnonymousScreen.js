import { View, Text } from 'react-native'
import React from 'react'
import {AnonymousSignIn as AnonymousSignInScreen} from '../features'

const AnonymousScreen = (props) => {
  return (
   <AnonymousSignInScreen props={props}/>
  )
}

export default AnonymousScreen;