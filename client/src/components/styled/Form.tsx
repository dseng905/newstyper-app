import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 400px;
`

export const Title = styled.h1`
`

const Input = styled.input`
  margin: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 17px;
`
export const TextInput = styled(Input).attrs({type : 'text'})``
export const PasswordInput = styled(Input).attrs({type : 'password', name: 'password'})``
export const EmailInput = styled(Input).attrs({type : 'email', name: 'email'})``

export const SubmitButton = styled.button`
  font-family: inherit;
  width: 100%;
  margin-top: 20px;
  padding: 5px;
  font-size: 17px;
  background-color: black;
  border: none;
  color: white;
  transition: 0.2s linear;

  &:hover {
    background-color: gray;
  }
`

