import React from 'react'
import NewsCategory from '../components/NewsCategory'
import { NewsSection } from '../utils/fetch_news'
import { Link } from 'react-router-dom'

const FrontPage : React.FC = () => {
    return (
      <div
        style={{
          boxSizing : 'border-box',
          padding: '0 50px',
          width : '100%'
        }}
      >
        <Link to='/test'>Go to Test Page</Link>
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
    )
}

export default FrontPage