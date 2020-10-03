import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import parseToDateString from '../utils/parse_date'
import UserContext from './contexts/UserContext'
import Cookies from 'js-cookie'


const Header : React.FC = () => {
  const currentDate = parseToDateString(Date.now())
  const [userContext, setUserContext] = useContext(UserContext)

  return (
    <div style={{ width: "100%" }}>
      <UserAccountActions>
        { userContext.signedIn
          ? <UserAccountActionButton onClick={signOut}>Sign Out</UserAccountActionButton>
          : (<div>
              <UserAccountActionLink to="/create_account">Register</UserAccountActionLink>
              <UserAccountActionLink to="/signin">Sign in</UserAccountActionLink>
            </div>)
        } 
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

  function signOut(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    Cookies.remove('token')
    Cookies.remove('userId')
    setUserContext({signedIn : false})
  }
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

const UserAccountActionButton = styled.button`
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: white;
  font-family: inherit;
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
  background-color: whitesmoke;
  width: 100%;
  padding: 10px 0;
`

const NavigatorLink = styled.p`
  margin: 0 10px;
`


export default Header