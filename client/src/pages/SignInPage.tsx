import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as Form from '../components/styled/Form'
import Page from '../components/styled/Page'
import { Link } from 'react-router-dom'

type InputEvent = React.ChangeEvent<HTMLInputElement>

const SignInPage : React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <Page>
      <Form.Container>
        <Form.Title>Sign-in To Your Account.</Form.Title>
        <Form.TextInput 
          placeholder="Email Address"
          onChange={(e : InputEvent) => setEmail(e.currentTarget.value)} 
        />
        <Form.PasswordInput 
          placeholder="Password"
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
}

export default SignInPage