import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ArticleTypingPage from './ArticleTypingPage'
import LoadingPage from './LoadingPage'
import ClockLoader from 'react-spinners/ClockLoader'
import { useParams } from 'react-router-dom'
import { fetchArticle, parseParagraphs } from '../utils/fetch_news'

const ArticlePage : React.FC = () => {
  const { id } = useParams()
  const [paragraphs, setParagraphs] = useState<string[]>([])
  const [article, setArticle] = useState<NewsInfo | null>(null)

  useEffect(() => {
    async function parseArticle() {
      const article = await fetchArticle(id)
      setParagraphs(parseParagraphs(article.article))
      setArticle(article)
    }
    parseArticle()
  }, [id])

  return (
    <div>
      {
        !article
        ? <LoadingPage />
        : <ArticleTypingPage 
            paragraphs={paragraphs}
            title={article.title}
            description={article.description}
            image={article.thumbnail!}
            date={article.date}
          />
      }
    </div>
  )

}


export default ArticlePage