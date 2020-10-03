import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import UserContext from './contexts/UserContext'
import UserStats from './UserStats'
import LinkButton from './LinkButton'
import NewsTyperApi, { UserStatisticsResponse } from '../utils/newstyper_api'
import typewriterImg from '../assets/typewriter.png'



const UserOverview : React.FC = () => {
  const [userStatistics, setUserStatistics] = useState<UserStatisticsResponse>({})
  const [userContext] = useContext(UserContext)
  const [hideOverview, setHideOverview] = useState(true)

  useEffect(() => {
    (async () => {
      const userStats = await NewsTyperApi.getUserStatistics()
      if(userStats) setUserStatistics(userStats)
      setHideOverview(false)
    })()
  }, [])

  const {
    dailyGoalArticlesCompleted,
    dailyGoal,
    totalArticlesCompleted,
    averageWpm
  } = userStatistics
  
  return (
    <UserStatisticsContainer hide={hideOverview}>
      { !userContext.signedIn
        ?(<div>
          <div style={{marginBottom: "30px"}}>
            <WelcomeText2>Welcome to NewsTyper!</WelcomeText2>
            <WelcomeSubtext>Practice your typing skills and keep yourself informed with latest news.</WelcomeSubtext> 
            <WelcomeSubtext>Sign-in or create an account to save your progress!</WelcomeSubtext>
          </div>
          <TypeNowButtons>
            <LinkButton label="Sign-in" to="/signin" />
            <LinkButton label="Register" to="/create_account" />
          </TypeNowButtons>
        </div>)
        :(<div>
          <WelcomeText><div>Welcome, {userContext.firstName}!</div></WelcomeText>
          <UserStatsContainer>
            <UserStats
              title="Daily Goal"
              displayNumber={dailyGoalArticlesCompleted ?? 0}
              maxDisplayNumber={dailyGoal ?? 3}
              unit="articles" 
            />
            <UserStats
              title="Total Articles"
              displayNumber={totalArticlesCompleted ?? 0}
              unit="articles" 
            />
            <UserStats 
              title="Average WPM"
              displayNumber={averageWpm ? (averageWpm >= 0 ? Math.round(averageWpm) : "N/A") : "N/A"}
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
    </UserStatisticsContainer>
  )
}


const UserStatisticsContainer = styled.div<{hide : boolean}>`
  transition: 1s;
  background-color: slategray;
  background-image: ${`url(${typewriterImg})`};
  background-size: contain;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  height: 300px;
  padding: 50px 0;
  opacity: ${props => props.hide ? '0' : '1'};
`

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