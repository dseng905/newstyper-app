import React from 'react'
import styled, { keyframes } from 'styled-components'
import LinkButton from './LinkButton'
import UserStats from '../components/UserStats'
import getTimerString from '../utils/get_timer_string'

interface TypingResultsInfo {
  wpm : number
  time : number
}

const TypingResults : React.FC<TypingResultsInfo> = (props) => (
  <TypingResultsContainer>
    <h1>Typing Results</h1>
    <InfoContainer>
      <UserStats 
        title="Time" 
        displayNumber={getTimerString(props.time)} 
        unit="" 
      />
      <UserStats 
        title="Average WPM" 
        displayNumber={props.wpm} 
        unit="WPM"
      />
    </InfoContainer>
    <LinkButton label="Back to Home Page" to="/" />
  </TypingResultsContainer>
)

const fadein = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const TypingResultsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  animation: ${fadein} 1s linear;

`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
`

export default TypingResults


