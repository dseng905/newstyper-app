import React from 'react'
import NewsCategory from '../components/NewsCategory'
import Header from '../components/Header'
import { NewsSection } from '../utils/fetch_news'
import { Link } from 'react-router-dom'

const FrontPage : React.FC = () => {
    return (
      <div style={{width: "100%"}}>
        <Header /> 
        <div
          style={{
            boxSizing : 'border-box',
            padding: '0 50px',
            width: "100%"
          }}
        >
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
        </div>
      </div>
    )
}

export default FrontPage