import React from 'react'
import NewsCategory from '../components/NewsCategory'
import Header from '../components/Header'
import { NewsSection } from '../utils/fetch_news'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import UserOverview from '../components/UserOverview'

const FrontPage : React.FC = () => {
  return (
    <div style={{width: "100%"}}>
      <Header  />
      <UserOverview /> 
      <FrontPageContent>
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


const FrontPageContent = styled.div`
  box-sizing: border-box;
  width: 100%;
`

export default FrontPage