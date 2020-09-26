import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components'
import FrontPage from './pages/FrontPage'
import ArticlePage from './pages/ArticlePage'
import SignInPage from './pages/SignInPage'
import CreateAccountPage from './pages/CreateAccountPage'
import Test from './pages/Test'
import NewsTyperApi from './utils/newstyper_api'
import Cookies from 'js-cookie'
import UserContext, { UserContextData, UserContextFunction } from './components/contexts/UserContext'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App : React.FC = () => {
  const [user, setUser] = useState<UserContextData>({signedIn : false})

  useEffect(() => {
    async function getUser() {
      const userSignedIn = await NewsTyperApi.getUserProfile()
      if(userSignedIn) {
        const { firstName, lastName, id : userId } = userSignedIn!
        setUser({ signedIn : true, firstName, lastName, userId })
      }
    }
    
    getUser()
  }, [])

  return (
    <UserContext.Provider value={[user, (a : UserContextData) => setUser(a)]}>
      <Router>
        <Root>
          <Switch>
            <Route exact path="/" children={<FrontPage/>} />
            <Route path="/article/:id+" children={<ArticlePage />} />
            <Route path="/signin" children={<SignInPage />} />
            <Route path="/create_account" children={<CreateAccountPage />} />
            <Route path="/test" children={ <Test />} />
          </Switch>
        </Root>
      </Router>
    </UserContext.Provider>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Bitter', serif;
`

export default App;

