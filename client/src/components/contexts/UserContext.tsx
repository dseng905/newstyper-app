import React from 'react'

export interface UserContextData {
  signedIn : boolean
  userId? : number
  firstName? : string
  lastName? : string
}

export type UserContextFunction = (a : UserContextData) => void
export type UserContextInterface = [UserContextData, UserContextFunction]


const UserContext = React.createContext<UserContextInterface>([
  {signedIn : false} as UserContextData, 
  (a : UserContextData) => {}
])

export default UserContext