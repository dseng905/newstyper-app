import React from 'react'
import styled from 'styled-components'

interface UserStatsInfo {
  title : string
  displayNumber : number | string
  maxDisplayNumber? : number | string
  unit : string
}

const UserStats : React.FC<UserStatsInfo> = (props) => {
  const displayNum = props.maxDisplayNumber 
    ? `${props.displayNumber}/${props.maxDisplayNumber}`
    : props.displayNumber

  return (
    <StatsContainer>
      <StatsTitle>{props.title}</StatsTitle>
      <StatsNumberDisplay>
        <StatsNumber>{displayNum}</StatsNumber>
        <StatsUnit>{props.unit}</StatsUnit>
      </StatsNumberDisplay>
    </StatsContainer>
  )
}

const StatsContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`

const StatsTitle = styled.h3`
  font-size: 30px;
  font-weight: normal;
  line-height: 0px;
  margin: 0px;
`

const StatsNumberDisplay = styled.div`
  display: flex;
  align-items: baseline;
  margin: 20px 0;
`

const StatsNumber = styled.div`
  font-size: 50px;
  margin-right: 10px;
`

const StatsUnit = styled.div`
  font-size: 20px;
`


export default UserStats