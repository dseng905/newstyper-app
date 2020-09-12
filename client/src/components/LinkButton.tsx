import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


interface LinkButtonInfo {
  label : string
  to : string
}

const LinkButton : React.FC<LinkButtonInfo> = (props) => (
  <div>
    <Link to={props.to} style={{textDecoration: "none", color: "white"}}>
      <ButtonContainer>{props.label}</ButtonContainer>
    </Link>
  </div>
)


const ButtonContainer = styled.div`
  display: inline-block;
  font-family: inherit;
  font-size: 17px;
  padding: 10px;
  margin: 0 10px;
  background-color: black;
  transition: 0.2s linear;
  text-align: center;
  width: auto;
  border-radius: 5px;
  

  &:hover {
    background-color: grey;
  }
`


export default LinkButton