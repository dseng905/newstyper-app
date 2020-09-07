import React from 'react';
import './App.css';
import styled from 'styled-components'
import FrontPage from './pages/FrontPage'
import ArticlePage from './pages/ArticlePage'
import TestPage from './pages/ArticleTypingPage'
import LoadingPage from './pages/LoadingPage'
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
        <Switch>
          <Route exact path="/" children={<FrontPage/>} />
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

