import React from 'react'
import styled from 'styled-components'
import ClockLoader from 'react-spinners/ClockLoader'

const LoadingPage : React.FC = () => {
  return (
    <LoadingPageContainer>
        <ClockLoader size={150} color={"gray"}/>
    </LoadingPageContainer>
  )
}

const LoadingPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`


export default LoadingPage