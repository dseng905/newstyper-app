import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ClockLoader from 'react-spinners/ClockLoader'
import { useParams } from 'react-router-dom'
import { fetchArticle } from '../utils/fetch_news'


const ArticlePage : React.FC = () => {
  const { id } = useParams()
  const [article, setArticle] = useState<NewsInfo | undefined>(undefined)

  useEffect(() => {
    async function getArticle() {
      const result = await fetchArticle(id)
      setArticle(result)
    }
    getArticle()
  }, [id])

  return (
    <div> {
      !article
      ? <ClockLoader size={150} color={"gray"}/>
      : <ArticleContainer>
          <h1>{article.title}</h1>
          <h3>{article.date.toString()}</h3>
          <ImageContainer>
            <img src={article.thumbnail} />
          </ImageContainer>
          <h2>{article.description}</h2>
          <div dangerouslySetInnerHTML={{ __html: article.article }} />
        </ArticleContainer>
    } </div>
  )
}


const ArticleContainer = styled.div`
  margin: 0 20%;
`

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 5%;
  box-sizing: border-box;

  & img {
    width: 100%;
    height: auto;
  }
`

export default ArticlePage