import React from 'react'
import { Link } from 'react-router-dom'

const Header : React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <div 
        id="front-page-header"
        style={{
          backgroundColor : 'black',
          color : 'white',
          borderBottom : '3px double black',
          width : '100%',
          textAlign : 'center'
        }}
      >
        <Link to="/" style={{textDecoration: "none", color : "white"}}>
          <p style={{fontFamily: "'Abril Fatface', cursive",fontSize: "50px", margin: "0"}}>The Newsletter</p>
        </Link>
        <p style={{fontSize: "20px", margin: "10px 0 10px 0"}}>The World's Finest News Source</p>
      </div>
      <div
        className="news-navigator"
        style={{
          display : 'flex',
          justifyContent : 'center',
          width: '100%',
          borderBottom : '1px solid black',
          padding: '10px 0',
          marginBottom : '50px'
        }}
      >
        <p style={{ margin: '0 10px'}}>Politics</p>
        <p style={{ margin: '0 10px'}}>Sports</p>
        <p style={{ margin: '0 10px'}}>Tech</p>
        <p style={{ margin: '0 10px'}}>Science</p>
        <p style={{ margin: '0 10px'}}>Food</p>
        <p style={{ margin: '0 10px'}}>Arts</p>
      </div>
    </div>
  )
}

export default Header