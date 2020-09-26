import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import * as Form from '../components/styled/Form'
import Page from '../components/styled/Page'
import { Link, useHistory } from 'react-router-dom'
import NewsTyperApi from '../utils/newstyper_api'
import setJwtToCookie from '../utils/set_jwt_to_cookie'
import UserContext from '../components/contexts/UserContext'

type InputEvent = React.ChangeEvent<HTMLInputElement>
type SubmitEvent = React.FormEvent<HTMLFormElement>

const SignInPage : React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)
  const [, setUserContext] = useContext(UserContext)
  const history = useHistory()

  return (
    <Page>
      <Form.Container onSubmit={onSubmit}>
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
        <Form.SubmitButton>Sign-in</Form.SubmitButton>
        <p>
          <i>Don't have an account? </i>
          <Link to='/create_account'><i>Create one now!</i></Link>
        </p>
      </Form.Container>
    </Page>
  )


  async function onSubmit(e: SubmitEvent) {
    e.preventDefault()

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
      const { userId, token, expiresIn, firstName, lastName } = res
      setJwtToCookie(userId!.toString(), token!, expiresIn!)
      setUserContext({signedIn : true, firstName, lastName, userId})
      history.push('/')
    }
  }
}

const ErrorMessage = styled.p`
  color: red;
`

export default SignInPage