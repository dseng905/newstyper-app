import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import UserContext from './contexts/UserContext'
import UserStats from './UserStats'
import LinkButton from './LinkButton'


const UserOverview : React.FC = () => {
  const [userContext] = useContext(UserContext)

  return (
    <div>
      { !userContext.signedIn
        ?(<div>
          <div style={{marginBottom: "30px"}}>
            <WelcomeText2>Welcome to NewsTyper!</WelcomeText2>
            <WelcomeSubtext>Practice your typing skills and keep yourself informed with latest news. </WelcomeSubtext> 
            <WelcomeSubtext>Sign-in or create an account to save your progress!</WelcomeSubtext>
          </div>
          <TypeNowButtons>
            <LinkButton label="Sign-in" to="/signin" />
            <LinkButton label="Register" to="/create" />
          </TypeNowButtons>
        </div>)
        :(<div>
          <WelcomeText><div>Welcome, Davin!</div></WelcomeText>
          <UserStatsContainer>
            <UserStats
              title="Daily Goal"
              displayNumber={1}
              maxDisplayNumber={3}
              unit="articles" 
            />
            <UserStats
              title="Display"
              displayNumber={15}
              unit="articles" 
            />
            <UserStats 
              title="Average WPM"
              displayNumber={15}
              unit="WPM"
            />
          </UserStatsContainer>
        </div>)
      }

      <TypeNowButtons>
        <div style={{fontSize: "20px"}}>Type Now:</div>
        <LinkButton label="All" to="/signin" />
        <LinkButton label="World" to="/" />
        <LinkButton label="Politics" to="/" />
        <LinkButton label="Sports" to="/" />
        <LinkButton label="Technology" to="/" />
        <LinkButton label="Art and Design" to="/" />
      </TypeNowButtons>
    </div>
  )
}

const TypeNowButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 50px;
`

const WelcomeText = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const WelcomeText2 = styled(WelcomeText)`
  margin-bottom: 10px;
`

const WelcomeSubtext = styled(WelcomeText)`
  font-weight: normal;
  font-size: 20px;
  margin-bottom: 5px;
`

const UserStatsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`


export default UserOverview