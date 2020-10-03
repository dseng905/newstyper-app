import NewsCard from './NewsCard'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchNews, NewsSection } from '../utils/fetch_news'
import ClockLoader from 'react-spinners/ClockLoader'



interface NewsCategoryInfo {
    category : string
    description : string
    section : NewsSection
    fontColor? : string
    backgroundColor? : string
}
  
const NewsCategory : React.FC<NewsCategoryInfo> = (props) => {
  const [articles, setArticles] = useState<NewsInfo[]>([])

  useEffect(() => {
    async function getNews() {
      const result = await fetchNews(props.section)
      setArticles(result)
    }
    getNews()
  },[props])

  const isLoading = (articles.length === 0)
  return (
    <NewsCategoryContainer backgroundColor={props.backgroundColor} fontColor={props.fontColor}>
      <NewsCategoryHeader>
        <NewsCategoryName>{props.category}</NewsCategoryName>
        <NewsCategoryDescription>{props.description}</NewsCategoryDescription>
      </NewsCategoryHeader>
      <NewsCategoryList>{ 
        isLoading
        ? <Placeholder>
            <ClockLoader size={110} color={"gray"} />
          </Placeholder>
        : articles.map((article) => 
            <NewsCard
              title={article.title}
              id={article.id}
              description={article.description + "..."}
              article={article.article}
              date={article.date}
              thumbnail={article.thumbnail}
              url={article.url}
          />)
      }</NewsCategoryList>
    </NewsCategoryContainer>
  )
}


const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 270px;
`

const NewsCategoryContainer = styled.div<{backgroundColor? : string, fontColor? : string}>`
  width: 100%;
  padding: 25px 50px;
  box-sizing: border-box;
  background-color: ${prop => prop.backgroundColor ?? "whitesmoke"};
  color: ${prop => prop.fontColor ?? "black"};
`

const NewsCategoryList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 0;
  justify-content: space-evenly;
`

const NewsCategoryHeader = styled.div`
  font-family: 'Bitter', serif;
  padding: 0 0;
  margin-bottom: 10px;
`

const NewsCategoryName = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 35px;
`
const NewsCategoryDescription = styled.p`
  margin: 0;
  font-size: 20px;
`

export default NewsCategory