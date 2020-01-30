import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => (
  <>
    <div className="hero-body">
      <div className="container">
        <p className="title is-1 has-text-centered">Geography Genius</p>
        <Link to="/questions"><button className="button is-primary is-active is-fullwidth">Start Game</button></Link>
      </div>
    </div>
  </>
)
export default Start