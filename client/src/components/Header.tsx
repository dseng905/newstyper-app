import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import parseToDateString from '../utils/parse_date'

const Header : React.FC = () => {
  const currentDate = parseToDateString(Date.now())

  return (
    <div style={{ width: "100%" }}>
      <UserAccountActions>
        <UserAccountActionLink to="/create_account">Register</UserAccountActionLink>
        <UserAccountActionLink to="/signin">Sign in</UserAccountActionLink>
      </UserAccountActions>
      <TitleContainer>
        <TitleLink to="/">NewsTyper</TitleLink>
        <Tagline>Type Your Way to the Truth.</Tagline>
      </TitleContainer>
      <Navigator>
        <NavigatorLink>{currentDate}</NavigatorLink>
      </Navigator>
    </div>
  )
}

/* Styled Components */
const UserAccountActions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  box-sizing: border-box;
  background-color: black;
  color: white;
  padding: 5px 20px;
`

const UserAccountActionLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 15px;
  margin: 0 10px;
`

const TitleContainer = styled.div`
  background-color: black;
  color: white;
  border-bottom : '3px double black';
  width: 100%;
  text-align: center;
  padding: 0px 10px 10px 10px;
  box-sizing: border-box;
`

const TitleLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: 'Abril Fatface', cursive;
  font-size: 50px;
  margin: 0;
`

const Tagline = styled.p`
  font-size: 15px;
  margin: 5px 0 10px 0;
`

const Navigator = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 10px 0;
  margin-bottom: 50px;
`

const NavigatorLink = styled.p`
  margin: 0 10px;
`


export default Header