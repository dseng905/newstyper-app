import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'


const NewsCard : React.FC<NewsInfo> = (props : NewsInfo) => (
  <NewsCardContainer>
    <Link to={`/article/${props.id}`} style={{textDecoration: "none"}}>
      <NewsCardImage image={props.thumbnail ?? ''}>
        <NewsCardTitle>
          <span>{props.title}</span>
          <NewsCardDescription>{props.description}</NewsCardDescription>
        </NewsCardTitle>
      </NewsCardImage>
    </Link>
  </NewsCardContainer>
)

const NewsCardImage = styled.div<{image : string}>`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  background-image: ${(prop) => `url(${prop.image})`};
  border-radius: 5px 5px 0 0;
`

const NewsCardDescription = styled.div`
  display: none;
  font-size: 15px;
  padding-top: 30px;
  color: transparent;
  text-align: center;
  transition: 0.5s;
  line-height: 25px;
  font-weight: normal;
`

const NewsCardTitle = styled.h1`
  vertical-align: center;
  margin: 0;
  padding: 10px 10px;
  font-size: 15px;
  color: white;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(0deg, rgba(0,0,0,1) 51%, rgba(255,255,255,0) 100%);
  transition: 0.5s ease-out;

  & > span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
  }
`

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const NewsCardContainer = styled.div`
  box-sizing: border-box;
  height: 250px;
  flex-basis: 320px;
  margin: 10px;
  border-radius: 5px;
  border: 0.5px solid black;
  font-family: 'Bitter', serif;
  animation: ${fadein} 1s linear;

  &:hover ${NewsCardTitle}{
    height: 100%;
    color: transparent;
    background: linear-gradient(0deg, rgba(0,0,0,1) 25%, rgba(255,255,255,0) 100%);
  }

  &:hover ${NewsCardDescription} {
    color: white;
    display: block;
  }
`



export default NewsCard