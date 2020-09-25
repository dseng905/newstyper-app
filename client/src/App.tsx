import React from 'react';
import './App.css';
import styled from 'styled-components'
import FrontPage from './pages/FrontPage'
import ArticlePage from './pages/ArticlePage'
import SignInPage from './pages/SignInPage'
import CreateAccountPage from './pages/CreateAccountPage'
import Test from './pages/Test'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App : React.FC = () => {
  return (
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
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: 'Bitter', serif;
`

export default App;

