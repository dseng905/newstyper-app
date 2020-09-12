import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import * as Form from '../components/styled/Form'
import Page from '../components/styled/Page'

type InputEvent = React.ChangeEvent<HTMLInputElement>

const CreateAccountPage : React.FC = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <Page>
      <Form.Container>
        <Form.Title>Create an Account.</Form.Title>
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
          onChange={(e : InputEvent) => setEmail(e.currentTarget.value)} 
        />
        <Form.PasswordInput
          placeholder="Password"
          onChange={(e : InputEvent) => setPassword(e.currentTarget.value)}
        />
        <Form.PasswordInput
          placeholder="Confirm Password"
          onChange={(e: InputEvent) => setConfirmPassword(e.currentTarget.value)} 
        />
        <Form.SubmitButton>Create Account</Form.SubmitButton>
      </Form.Container>
    </Page>
  )
}

export default CreateAccountPage