import React from 'react';
import './App.css';
import styled from 'styled-components'
import FrontPage from './pages/FrontPage'
import ArticlePage from './pages/ArticlePage'
import TestPage from './pages/TestPage'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App : React.FC = () => {
  return (
    <Router>
      <Root>
        <Header />
        <Switch>
          <Route exact path="/" children={<FrontPage/>} />
          <Route path="/test" children={<TestPage />} />
          <Route path="/article/:id+" children={<ArticlePage />} />
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

