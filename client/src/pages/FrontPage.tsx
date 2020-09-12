import React from 'react'
import NewsCategory from '../components/NewsCategory'
import Header from '../components/Header'
import LinkButton from '../components/LinkButton'
import UserStats from '../components/UserStats'
import { NewsSection } from '../utils/fetch_news'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FrontPage : React.FC = () => {
  const currentDate = (new Date(Date.now()))
    .toLocaleDateString(undefined, {
      weekday : 'long',
      year : 'numeric',
      month : 'long',
      day : 'numeric'
    })
    
  return (
    <div style={{width: "100%"}}>
      <Header /> 
      <FrontPageContent>
        <WelcomeText>
          <div>Welcome, Davin!</div>
        </WelcomeText>

        <UserOverview>
          <UserStats
            title="Daily Goal"
            displayNumber={1}
            maxDisplayNumber={3}
            unit="articles" 
          />
          <UserStats
            title="Display"
            displayNumber={15}
            unit="articles" 
          />
          <UserStats 
            title="Average WPM"
            displayNumber={15}
            unit="WPM"
          />
        </UserOverview>

        <TypeNowButtons>
          <div style={{fontSize: "20px"}}>Type Now:</div>
          <LinkButton label="All" to="/signin" />
          <LinkButton label="World" to="/" />
          <LinkButton label="Politics" to="/" />
          <LinkButton label="Sports" to="/" />
          <LinkButton label="Technology" to="/" />
          <LinkButton label="Art and Design" to="/" />
        </TypeNowButtons>
        

        <NewsCategory 
          category="Around the World"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          section={NewsSection.WORLD}
        />
        <NewsCategory 
          category="Politics"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          section={NewsSection.POLITICS}
        />
        <NewsCategory 
          category="Sports"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          section={NewsSection.SPORTS}
        />
        <NewsCategory 
          category="Technology"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          section={NewsSection.TECHNOLOGY}
        />
        <NewsCategory 
          category="Art and Design"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
          section={NewsSection.ARTS}
        />
      </FrontPageContent>
    </div>
  )
}


const TypeNowButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 50px;
`

const FrontPageContent = styled.div`
  box-sizing: border-box;
  padding: 0 50px;
  width: 100%;
`

const UserOverview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const WelcomeText = styled.div`
  font-size: 35px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default FrontPage