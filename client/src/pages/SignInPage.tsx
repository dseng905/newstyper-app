import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as Form from '../components/styled/Form'
import Page from '../components/styled/Page'
import { Link, useHistory } from 'react-router-dom'
import NewsTyperApi from '../utils/newstyper_api'
import setJwtToCookie from '../utils/set_jwt_to_cookie'

type InputEvent = React.ChangeEvent<HTMLInputElement>
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

const SignInPage : React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)
  const history = useHistory()

  return (
    <Page>
      <Form.Container>
        <Form.Title>Sign-in To Your Account.</Form.Title>
        { showError && <ErrorMessage>{errorMessage}</ErrorMessage> }
        <Form.EmailInput 
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e : InputEvent) => setEmail(e.currentTarget.value)} 
        />
        <Form.PasswordInput 
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e : InputEvent) => setPassword(e.currentTarget.value)} 
        />
        <Form.SubmitButton onClick={onClick}>Sign-in</Form.SubmitButton>
        <p>
          <i>Don't have an account? </i>
          <Link to='/create_account'><i>Create one now!</i></Link>
        </p>
      </Form.Container>
    </Page>
  )


  async function onClick(e: ButtonClickEvent) {
    if(email === "" || password === "") {
      setErrorMessage("Please enter both your email and password.")
      setShowError(true)
      return
    }

    const res = await NewsTyperApi.signInToUserProfile({ email, password })
    if('error' in res) {
      setErrorMessage(res.error!)
      setShowError(true)
    } else {
      const { userId, token, expiresIn } = res
      setJwtToCookie(userId!, token!, expiresIn!)
      history.push('/')
    }
  }
}

const ErrorMessage = styled.p`
  color: red;
`

export default SignInPage