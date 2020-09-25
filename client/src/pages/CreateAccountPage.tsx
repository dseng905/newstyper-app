import React, { useState, useEffect } from 'react'
import * as Form from '../components/styled/Form'
import Page from '../components/styled/Page'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import NewsTyperApi from '../utils/newstyper_api'
import setJwtToCookie from '../utils/set_jwt_to_cookie'

type InputEvent = React.ChangeEvent<HTMLInputElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>



const CreateAccountPage : React.FC = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory()

  return (
    <Page>
      <Form.Container>
        <Form.Title>Create an Account.</Form.Title>
        { showError &&
          <ErrorMessage>{errorMessage}</ErrorMessage>
        }
        <Form.TextInput
          placeholder="First Name"
          onChange={(e : InputEvent) => setFirstName(e.currentTarget.value)} 
        />
        <Form.TextInput
          placeholder="Last Name"
          onChange={(e : InputEvent) => setLastName(e.currentTarget.value)} 
        />
        <Form.TextInput
          placeholder="Email Address"
          value={email}
          onChange={(e : InputEvent) => setEmail(e.currentTarget.value)} 
        />
        <Form.PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e : InputEvent) => setPassword(e.currentTarget.value)}
        />
        <Form.PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e: InputEvent) => setConfirmPassword(e.currentTarget.value)} 
        />
        <Form.SubmitButton onClick={onClick}>Create Account</Form.SubmitButton>
      </Form.Container>
    </Page>
  )

  async function onClick(e: ButtonClickEvent) {
    const checkFields = checkWhichFieldsAreEmpty()
    if(checkFields.fieldsAreEmpty) {
      setErrorMessage(checkFields.error)
      setShowError(true)
      return
    }

    if(confirmPassword !== password) {
      setPassword("")
      setConfirmPassword("")
      setErrorMessage("Passwords do not match. Please try again.")
      setShowError(true)
      return
    }

    const res = await NewsTyperApi
      .createUserProfile({ email, password, firstName, lastName })
    
    if('error' in res) {
      setErrorMessage(res.error!)
      setShowError(true)
    } else {
      const { userId, token, expiresIn } = res
      setJwtToCookie(userId!, token!, expiresIn!)
      history.push("/")
    }

  }

  function checkWhichFieldsAreEmpty() : {fieldsAreEmpty : boolean, error : string} {
    const emptyFields : string[] = []

    if(email === "") emptyFields.push('Email Address')
    if(firstName === "") emptyFields.push('First Name')
    if(lastName === "") emptyFields.push('Last Name')
    if(password === "") emptyFields.push('Password')
    if(confirmPassword === "") emptyFields.push('Confirm Password')

    let emptyFieldsString = "The following fields are empty: "
    for(const field of emptyFields) emptyFieldsString += `${field}, `

    return emptyFields.length === 0
      ? {fieldsAreEmpty : false, error : "All fields are filled."}
      : {fieldsAreEmpty : true, error : emptyFieldsString}
  }
}

const ErrorMessage = styled.p`
  color: red;
`


export default CreateAccountPage